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


      var row = $("<tr></tr>");
      row.append("<th> Blueprint Name</th>");
      row.append("<th> Number of points</th>");
      row.append("<th> Open</th>");
      tableBody.append(row);


      mappedBlueprints.map(function(bp) {
        var row2 = $("<tr></tr>");
        row2.append($("<td>" + bp.name + "</td>"));
        row2.append($("<td>" + bp.points + "</td>"));
        row2.append($("<td> <button> Open </button> </td>"))
        tableBody.append(row2);
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
