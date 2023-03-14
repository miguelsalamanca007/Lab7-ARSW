var app = (function() {
  //var api = apimock;
  var api = apiclient;

  var currentBlueprint;
  var canvas, ctx;

  $(document).ready(function() {
    canvas = document.getElementById("my-canvas");
    ctx = canvas.getContext("2d");
  });

  var updateBlueprintsByAuthor = function(authorName) {
    api.getBlueprintsByAuthor(authorName, function(blueprints) {
      var mappedBlueprints = blueprints.map(function(bp) {
        return {
          name: bp.name,
          points: bp.points.length
        };
      });

      var tableBody = $("#blueprint-table tbody");
      tableBody.find("tr:not(:first)").remove();

      mappedBlueprints.map(function(bp) {
        var row = $("<tr></tr>");
        row.append($("<td>" + bp.name + "</td>"));
        row.append($("<td>" + bp.points + "</td>"));
        var openButton = $("<button>Open</button>");
        openButton.click(function() {
          api.getBlueprintsByNameAndAuthor(authorName, bp.name, function(
            blueprint
          ) {
            currentBlueprint = blueprint;
            drawBlueprint(currentBlueprint);
            $("#current-blueprint").text(currentBlueprint.name);
          });
        });
        row.append($("<td></td>").append(openButton));
        tableBody.append(row);
      });

      var totalPoints = blueprints.reduce(function(total, bp) {
        return total + bp.points.length;
      }, 0);

      $("#total-points").text(totalPoints);
    });
  };


  var drawBlueprint = function(blueprint) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    var points = blueprint.points;
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  };

  $(document).ready(function() {
    $("#get-blueprints").click(function() {
      var authorName = $("#author").val();
      updateBlueprintsByAuthor(authorName);
      $("#selected-author").text(authorName);
    });
  });

  return {
    updateBlueprintsByAuthor: updateBlueprintsByAuthor,
    drawBlueprint: drawBlueprint
  };
})();

