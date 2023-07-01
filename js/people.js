function tableRow(...cells) {
  var row = "<tr>";
  cells.forEach(element => {
    if (searchValue !== "") {
      element = element
        .toString()
        .replace(
          searchValue,
          '<span class="search-highlight">' + searchValue + "</span>"
        );
    }
    row += "<td>" + element + "</td>";
  });
  return row + "</tr>";
}

function buildTable(rows) {
  var table =
    "<tr><th>#</th><th>Name</th><th>Position</th><th>Profession</th><th>Office</th><th>Age</th><th>Sex</th><th>Sallary</th></tr>";
  rows.forEach((element, index, array) => {
    table += tableRow(
      index + 1,
      element.name,
      element.position,
      element.profession,
      element.office,
      element.age,
      element.gender,
      "$" + element.sallary
    );
  });
  document.getElementById("main-table").innerHTML = table;
}

function matches(row, request) {
  let result = false;
  Object.keys(row).forEach(key => {
    if (!result) {
      result = row[key].toString().indexOf(request) > -1;
    }
  });
  return result;
}

let tableData = [];
let searchValue = "";

let request = new XMLHttpRequest();
request.open("GET", "res/people.json");
request.send();
request.onreadystatechange = () => {
  if (request.status === 200) {
    tableData = JSON.parse(request.responseText);
    buildTable(tableData);
    request = null;
  }
};

document.getElementById("search-field").addEventListener("input", function() {
  searchValue = document.getElementById("search-field").value;
  let result = [];
  tableData.forEach(value => {
    if (matches(value, searchValue)) {
      result.push(value);
    }
  });
  document.getElementById("search-sounter").innerHTML = result.length;
  buildTable(result);
});
