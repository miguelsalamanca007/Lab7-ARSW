var app = (function () {
  //var api = apimock;
  var api = apiclient;

  var currentBlueprint;
  var canvas, ctx;
  let points;
  let authorName;

  var updateBlueprintsByAuthor = function (authorName) {
    api.getBlueprintsByAuthor(authorName, function (blueprints) {
      var mappedBlueprints = blueprints.map(function (bp) {
        return {
          name: bp.name,
          points: bp.points,
        };
      });

      var tableBody = $("#blueprint-table tbody");
      tableBody.find("tr:not(:first)").remove();

      mappedBlueprints.map(function (bp) {
        var row = $("<tr></tr>");
        row.append($("<td>" + bp.name + "</td>"));
        row.append($("<td>" + bp.points.length + "</td>"));
        var openButton = $("<button>Open</button>");
        openButton.click(function () {
          api.getBlueprintsByNameAndAuthor(
            authorName,
            bp.name,
            function (blueprint) {
              currentBlueprint = blueprint;
              currentPoints = currentBlueprint.points;
              points = currentBlueprint.points;
              drawBlueprint(currentBlueprint);
              $("#current-blueprint").text(currentBlueprint.name);
            }
          );
        });
        row.append($("<td></td>").append(openButton));
        tableBody.append(row);
      });

      if (window.PointerEvent) {
        canvas.removeEventListener("pointerdown", draw);
        canvas.addEventListener("pointerdown", draw);
      }

      function draw(event) {
        var xCoord = event.pageX - event.target.offsetLeft;
        var yCoord = event.pageY - event.target.offsetTop;
        ctx.moveTo(points.slice(-1).x, points.slice(-1).y);
        console.log(points);
        ctx.lineTo(xCoord, yCoord);
        points.push({ x: xCoord, y: yCoord });
        ctx.stroke();
      }

      var totalPoints = blueprints.reduce(function (total, bp) {
        return total + bp.points.length;
      }, 0);

      $("#total-points").text(totalPoints);
    });

    var updateBlueprints = function () {
      console.log("updating...");
      if (currentBlueprint) {
        api.updateBlueprints(authorName, currentBlueprint.name, points);
        alert("Updated Blueprint");
        updateBlueprintsByAuthor(authorName);
      }
    };

    var saveButton = $("#save-blueprints");
    saveButton.click(updateBlueprints);

    var deleteBlueprint = function () {
      console.log("deleting...");
      if (currentBlueprint) {
        api.deleteBlueprint(authorName, currentBlueprint.name);
        $("#current-blueprint").text("");
        drawBlueprint({ points: [] });
        alert("Deleted Blueprint");
        updateBlueprintsByAuthor(authorName);
      }
    };

    var deleteButton = $("#delete-blueprints");
    deleteButton.click(deleteBlueprint);

    var createBlueprint = function () {
      const author = prompt("Ingresa el nombre del autor");
      const name = prompt("Ingresa el nombre del Blueprint");
      api.postBlueprints(author, name, []);
      updateBlueprintsByAuthor(author);
      $("#selected-author").text(author);
      $("#current-blueprint").text(name);
      authorName = author;
      currentBlueprint = { name: name, points: [] };
      points = [];
      drawBlueprint({ points: [] });
      alert("Created Blueprint");
    };

    var createButton = $("#create-blueprint");
    createButton.click(createBlueprint);
  };

  var drawBlueprint = function (blueprint) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    var points = blueprint.points;
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  };

  $(document).ready(function () {
    canvas = document.getElementById("my-canvas");
    ctx = canvas.getContext("2d");
    $("#get-blueprints").click(function () {
      authorName = $("#author").val();
      updateBlueprintsByAuthor(authorName);
      $("#selected-author").text(authorName);
    });
  });

  return {
    updateBlueprintsByAuthor: updateBlueprintsByAuthor,
    drawBlueprint: drawBlueprint,
  };
})();
