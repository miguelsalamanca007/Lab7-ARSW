var app = (function() {
  var api = apimock;

  var updateBlueprintsByAuthor = function(authorName) {

    api.getBlueprintsByAuthor(authorName, function(blueprints) {
      var mappedBlueprints = blueprints.map(function(bp) {
        return {
          name: bp.name,
          points: bp.points.length
        };
      });

      var tableBody = $("#blueprint-table");
      tableBody.empty();

      mappedBlueprints.map(function(bp) {
        var row = $("<tr></tr>");
        row.append($("<td>" + bp.name + "</td>"));
        row.append($("<td>" + bp.points + "</td>"));
        tableBody.append(row);
      });

      var totalPoints = blueprints.reduce(function(total, bp) {
        return total + bp.points.length;
      }, 0);

      $("#total-points").text(totalPoints);
    });
  };

  $(document).ready(function() {
    $("#get-blueprints").click(function() {
      var authorName = $("#author").val();
      updateBlueprintsByAuthor(authorName);
      $("#selected-author").text(authorName);
    });
  });

  return {
    updateBlueprintsByAuthor: updateBlueprintsByAuthor
  };
})();
