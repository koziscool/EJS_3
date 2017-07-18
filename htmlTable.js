
var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];


var buildTable = function(data) {
  var table = document.createElement("table");

  var fields = Object.keys(data[0]);
  var headRow = document.createElement("tr");
  fields.forEach(function(field) {
    var headCell = document.createElement("th");
    headCell.textContent = field;
    headRow.appendChild(headCell);
  });
  table.appendChild(headRow);

  data.forEach(function(object) {
    var row = document.createElement("tr");
    fields.forEach(function(field) {
      var cell = document.createElement("td");
      cell.textContent = object[field];
      if (typeof object[field] == "number")
        cell.style.textAlign = "right";
      row.appendChild(cell);
    });
    table.appendChild(row);
  });

  return table;
};

