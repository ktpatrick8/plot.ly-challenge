let dropdown = jQuery('#selDataset');

const url = 'samples.json';

// Populate dropdown with list of provinces
jQuery.getJSON(url, function (data) {
  jQuery.each(data, function (key, entry) {
    dropdown.append($('<option></option>').attr('value', entry.name).text(entry.name));
  })
});
  
// d3.selectAll("#selDataset").on("change", optionChanged);

// function optionChanged(value){  
//     // console.log(value);
//     makeBarChart(value);
//     bubbleChart(value);
//     metadata(value);
//     }

// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("samples.json").then((importedData) => {
    console.log(importedData);
//     var data = importedData;
  
//     // Sort the data array using the greekSearchResults value
//     data.sort(function(a, b) {
//       return parseFloat(b.sample_values) - parseFloat(a.sample_values);
//     });
  
//     // Slice the first 10 objects for plotting
//     data = data.slice(0, 10);
  
//     // Reverse the array due to Plotly's defaults
//     data = data.reverse();
  
//     // Trace1 for the Greek Data
//     var trace1 = {
//       x: data.map(row => row.sample_values),
//       y: data.map(row => row.otu_ids),
//       text: data.map(row => row.otu_labels),
//       name: "Greek",
//       type: "bar",
//       orientation: "h"
//     };
  
//     // data
//     var chartData = [trace1];
  
//     // Apply the group bar mode to the layout
//     var layout = {
//       title: "Greek gods search results",
//       margin: {
//         l: 100,
//         r: 100,
//         t: 100,
//         b: 100
//       }
//     };
  
//     // Render the plot to the div tag with id "plot"
//     Plotly.newPlot("bar", chartData, layout);
  });
  