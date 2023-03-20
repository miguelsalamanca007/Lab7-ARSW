apiclient = (function () {
  var privateGetBlueprintsByAuthor = function (authname, callback) {
    $.get("http://localhost:8080/blueprints/" + authname, function (response) {
      console.log(response);
      callback(response);
    });
  };

  return {
    getBlueprintsByAuthor: privateGetBlueprintsByAuthor,
    getBlueprintsByNameAndAuthor: function (authname, bpname, callback) {
      $.get(
        "http://localhost:8080/blueprints/" + authname + "/" + bpname,
        function (response) {
          callback(
            response.find(function (e) {
              return e.name === bpname;
            })
          );
        }
      );
    },

    setSelectedAuthor: function (authname) {
      $.get(
        "http://localhost:8080/blueprints/" + authname,
        function (response) {
          if (response.length > 0) {
            selectedAuthor = authname;
          }
        }
      );
    },

    updateBlueprints: function (authname, bpname, points) {
      var blueprint = {
        author: authname,
        name: bpname,
        points: points,
      };

      $.ajax({
        url:
          "http://localhost:8080/blueprints/update/" + authname + "/" + bpname,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(blueprint),
        success: function (result) {
          console.log(result);
          alert("Updated");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.status + " " + jqXHR.statusText);
        },
      });
    },

    postBlueprints: function (authname, bpname, points) {
      var blueprint = {
        author: authname,
        name: bpname,
        points: points,
      };

      $.ajax({
        url: "http://localhost:8080/blueprints/crear",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(blueprint),
        success: function (result) {
          console.log(result);
          alert("Created");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.status + " " + jqXHR.statusText);
        },
      });
    },

    deleteBlueprint: function (authname, bpname) {
      $.ajax({
        url: `http://localhost:8080/blueprints/${authname}/${bpname}`,
        type: "DELETE",
        contentType: "application/json",
        success: function (result) {
          console.log(result);
          alert("Deleted");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.status + " " + jqXHR.statusText);
        },
      });
    },
  };
})();
