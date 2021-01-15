function buildCharts(sample){
  d3.json('samples.json').then((data) => {
    //storing data into variable and then filtering out based on sample
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    //slicing top 10 yticks
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
  
    // adding bardata variable
    var barData = [
      {
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      text: otu_labels.slice(0,10).reverse(),
      name: "Top 10",
      type: "bar",
      orientation: "h"
    }
  ];

    // adding barlayour variable
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    // Bubble Chart Layout
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 0 },
      xaxis: { title: "OTU ID" },
      margin: { t: 30}
    };

    //Bubble Chart Data
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Viridis"
        }
      }
    ];

//Building charts
Plotly.newPlot("bar", barData, barLayout);
Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  })
};

//populating the metadata
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    // Use d3 to select `#sample-metadata`
    var metaData = d3.select("#sample-metadata");

    //clear any existing metadata
    metaData.html("");

    Object.entries(result).forEach(([key, value]) => {
      metaData.append("h5").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

//initate page function with beginning sample
function init() {
  var selector = d3.select('#selDataset');

  d3.json('samples.json').then((data) => {
    var names = data.names;

    names.forEach((sample) => {
      selector.append("option")
        .text(sample)
        .property("value", sample);
    });
    var initSample = names[0];
    buildCharts(initSample);
    buildMetadata(initSample);
  });
};

init();

function optionChanged(option) {
  // Fetch new data each time a new sample is selected
  buildCharts(option);
  buildMetadata(option);
}

