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
        { x: 140, y: 140 },
        { x: 115, y: 115 },
      ],
      name: "micasita",
    },
    {
      author: "miguel",
      points: [
        { x: 140, y: 140 },
        { x: 115, y: 115 },
      ],
      name: "micasita2",
    },
  ];
  mockdata["juanca"] = [
    {
      author: "juanca",
      points: [
        { x: 140, y: 140 },
        { x: 115, y: 115 },
      ],
      name: "iHouse",
    },
    {
      author: "juanca",
      points: [
        { x: 140, y: 140 },
        { x: 115, y: 115 },
      ],
      name: "iHouseProMax",
    },
  ];
  mockdata["juanqui"] = [
    {
      author: "juanqui",
      points: [
        { x: 140, y: 140 },
        { x: 115, y: 115 },
      ],
      name: "caserio",
    },
    {
      author: "juanqui",
      points: [
        { x: 140, y: 140 },
        { x: 115, y: 115 },
      ],
      name: "caserio2",
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
  };
})();

/*
  Example of use:
  var fun=function(list){
	  console.info(list);
  }
  
  apimock.getBlueprintsByAuthor("johnconnor",fun);
  apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/
