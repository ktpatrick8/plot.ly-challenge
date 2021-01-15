function buildBarchart(sample){
  d3.json('samples.json').then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
  
    // Trace1
    var data = [
      {
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      text: otu_labels.slice(0,10).reverse(),
      name: "Top 10",
      type: "bar",
      orientation: "h"
    }
  ];

    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

Plotly.newPlot("bar", data, barLayout);
  })
};

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
    buildBarchart(initSample);
  });
};

init();