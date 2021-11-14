// from data.js
var tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
let date = d3.select("#datetime");
let city = d3.select("#city");
let state = d3.select("#state");
let country = d3.select("#country");
let shape = d3.select("#shape");

    // 4b. Save the value that was changed as a variable.
    let dateValue = date.property("value");
let cityValue = city.property("value");
let stateValue = state.property("value");
let countryValue = country.property("value");
let shapeValue = shape.property("value");

    // 4c. Save the id of the filter that was changed as a variable.
    let dateId = date.node().id;
    let cityId = city.node().id;
    let stateId = state.node().id;
    let countryId = country.node().id;
    let shapeId = shape.node().id;
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
  if (dateValue) {
    filters.datetime = dateValue;
} else {
delete filters.date
}
if (cityValue) {
    filters.city = cityValue;
} else {
delete filters.city
}
if (stateValue) {
    filters.state = stateValue;
} else {
delete filters.state
}
if (countryValue) {
    filters.country = countryValue;
} else {
delete filters.country
}
if (shapeValue) {
    filters.shape = shapeValue;
} else {
delete filters.shape
}

    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;

    
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    for (const [key, value] of Object.entries(filters)) {
    filteredData = filteredData.filter(row => row[key] === value);
    }

    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);

  }
  
// 2. Attach an event to listen for changes to each filter
d3.selectAll("#datetime").on("change", updateFilters);
d3.selectAll("#city").on("change", updateFilters);
d3.selectAll("#state").on("change", updateFilters);
d3.selectAll("#country").on("change", updateFilters);
d3.selectAll("#shape").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);