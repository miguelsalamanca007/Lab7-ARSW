//@author hcadavid

apimock = (function () {
  var mockdata = [];

  mockdata["johnconnor"] = [
    {
      author: "johnconnor",
      points: [
        { x: 150, y: 120 },
        { x: 215, y: 115 },
      ],
      name: "house",
    },
    {
      author: "johnconnor",
      points: [
        { x: 340, y: 240 },
        { x: 15, y: 215 },
      ],
      name: "gear",
    },
  ];
  mockdata["maryweyland"] = [
    {
      author: "maryweyland",
      points: [
        { x: 140, y: 140 },
        { x: 115, y: 115 },
      ],
      name: "house2",
    },
    {
      author: "maryweyland",
      points: [
        { x: 140, y: 140 },
        { x: 115, y: 115 },
      ],
      name: "gear2",
    },
  ];
  mockdata["miguel"] = [
    {
      author: "miguel",
      points: [
        { x: 1, y: 140 },
        { x: 200, y: 25 },
      ],
      name: "micasita",
    },
    {
      author: "miguel",
      points: [
        { x: 33, y: 21 },
        { x: 77, y: 45 },
      ],
      name: "micasita2",
    },
  ];
  mockdata["juanca"] = [
    {
      author: "juanca",
      points: [
        { x: 333, y: 12 },
        { x: 200, y: 225 },
      ],
      name: "iHouse",
    },
    {
      author: "juanca",
      points: [
        { x: 77, y: 22 },
        { x: 400, y: 235 },
      ],
      name: "iHouseProMax",
    },
  ];
  mockdata["juanqui"] = [
    {
      author: "juanqui",
      points: [
        { x: 234, y: 140 },
        { x: 456, y: 333 },
      ],
      name: "caserio",
    },
    {
      author: "juanqui",
      points: [
        { x: 123, y: 64 },
        { x: 21, y: 22 },
      ],
      name: "caserio2",
    },
  ];

  mockdata["bayona"] = [
    {
      author: "bayona",
      points: [
        { x: 44, y: 256 },
        { x: 478, y: 122 },
      ],
      name: "duitama",
    },
    {
      author: "bayona",
      points: [
        { x: 187, y: 46 },
        { x: 7, y: 304 },
      ],
      name: "boyaca",
    },
  ];

  var privateGetBlueprintsByAuthor = function (authname, callback) {
    callback(mockdata[authname]);
  };

  return {
    getBlueprintsByAuthor: privateGetBlueprintsByAuthor,
    getBlueprintsByNameAndAuthor: function (authname, bpname, callback) {
      callback(
        mockdata[authname].find(function (e) {
          return e.name === bpname;
        })
      );
    },

    setSelectedAuthor: function (authname) {
        if (mockdata[authname]) {
            selectedAuthor = authname;
        }
    },

  };
})();

/*
  Example of use:
  var fun=function(list){
	  console.info(list);
  }
  
  apimock.getBlueprintsByAuthor("johnconnor",fun);
  apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/
