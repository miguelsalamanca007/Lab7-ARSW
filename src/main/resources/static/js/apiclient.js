apiclient = (function () {

    var privateGetBlueprintsByAuthor = function(authname, callback) {
        $.get("http://localhost:8080/blueprints/" + authname, function(response) {
            console.log(response);
            callback(response);
        });
    };

    return {
        getBlueprintsByAuthor: privateGetBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: function(authname, bpname, callback) {
            $.get("http://localhost:8080/blueprints/" + authname + "/" + bpname, function(response) {
                callback(
                    response.find(function(e) {
                    return e.name === bpname;
                    })
                );
            });
        },

        setSelectedAuthor: function(authname) {
            $.get("http://localhost:8080/blueprints/" + authname, function(response) {
                if (response.length > 0) {
                    selectedAuthor = authname;
                }
            });
        }
    };
    
})();
