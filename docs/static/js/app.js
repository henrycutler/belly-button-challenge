let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function dropdown(){
    let menuselector = d3.select("#selDataset")
    d3.json(url).then(function(data) {
        console.log(data);
        let names = data.names
        console.log(names);
        names.forEach((sample) => {
            menuselector
              .append("option")
              .text(sample)
              .property("value", sample);
          });
          createcharts(names[0])
          createtable(names[0])


      });

}
dropdown()

function optionChanged(new_id) {

    createcharts(new_id);
    createtable(new_id)
  }

  function createtable(sample) {
    d3.json(url).then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
     
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }


function createcharts(input_id){
    d3.json(url).then(function(data) {
        console.log(data);
        let samples = data.samples
        console.log(samples);

        let sampleresult = samples.filter(x => x.id==input_id);
        sampleresult = sampleresult[0]

        sample_values = sampleresult.sample_values

        otu_ids = sampleresult.otu_ids
        
        otu_labels = sampleresult.otu_labels

        var bardata = [{
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            orientation: 'h',
            type: 'bar'
          }];
          
          var barlayout = {
            title: 'Bar Chart',
          };
          
          Plotly.newPlot('bar', bardata, barlayout);
          var bubbledata = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Earth"
            }
          }];
          
          var bubblelayout = {
            title: 'Bubble Chart',
            showlegend: false,
          };
          Plotly.newPlot('bubble', bubbledata, bubblelayout);

        var metadata = data.metadata;

        // Filter the data for the object with the desired sample number
        var resultArray = metadata.filter(sampleObj => sampleObj.id == input_id);
        let wfreq = resultArray.map(obj => obj['wfreq'])[0];
     
        console.log(wfreq)
        var data = [{
		    domain: { x: [0, 1], y: [0, 1] },
		    value: wfreq,
		    title: { text: "Belly Button Washing Frequency" },
		    type: "indicator",
		    mode: "gauge+number",
            gauge: {axis: {range:[0, 9]}},
                steps: [
                    {range: [0,1], color: "white"},
                    {range: [1,2], color: "beige"},
                    {range: [2,3], color: "bisque"},
                    {range: [3,4], color: "khaki"},
                    {range: [4,5], color: "honeydew"},
                    {range: [5,6], color: "lightgreen"},
                    {range: [6,7], color: "greenyellow"},
                    {range: [7,8], color: "green"},
                    {range: [8,9], color: "darkgreen"}]
                
          }]
    
      var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);

        
})}