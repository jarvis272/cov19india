
let city;
let chart;
let state = document.querySelector('#state');
let labels, data, config, region,Options;
let loaded;
window.addEventListener("DOMContentLoaded", function () {
    loaded = false;
    city = "Andaman and Nicobar Islands";
    getData();


});
state.addEventListener('change', function (e) {
    console.log(e.target.value);
    loaded = true;
    city = e.target.value;

    if (city === "") {
        alert("Please Enter Value", "danger");
    } else {

        getData();

    }


});
async function getData() {
    //    fetch(`https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true`).then(response => {return response.json();}).then(displayResult);
    const response = await fetch('https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true');
    const json = await response.json();
    displayResult(json)
}
function displayResult(Result) {
    console.log("display");

    region = Result.regionData.find(r => r.region === city);
    console.log(region);

    labels = [
        'TotalInfected',
        'TotalRecovered',
        'activeCases',
        'NewInfected',
        'NewRecovered',

    ];
    
    data = {

        labels: labels,

        datasets: [{
            label: city,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [region.totalInfected, region.recovered, region.activeCases, region.newInfected, region.newRecovered],
            backgroundColor: [
                'rgb(255, 0, 0,.5)',
                'rgba(0, 255, 0, 0.5)',
                'rgba(255, 0, 0, 0.9)',
                'rgba(255,255,0,.5)',
                'rgba(0, 0, 255, 0.5)'
            ],
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 2,
            hoverBordercolor: "#000",
            hoverOffset: 5,
            weight:300

        }]
    };
    Options = {
       
    };

    config = {
        type: "doughnut",
        data: data,
        options: {
            
            radius:"100%",
            cutout:"70%",
            animation:{animateScale:true},
           responsive:true, maintainAspectRatio: false,
              
        }
    }


    if (loaded) {
        console.log("update");

        removeData(chart, data.datasets);
    } else {
        console.log("create");
        createChart();
    }

}
function createChart() {
    console.log("fun");
    Chart.defaults.color="rgba(0,0,0,.5)";
    chart = new Chart(document.getElementById("myChart"), config);
    Chart.defaults.plugins.title.text=true;
    chart.defaultFontColor = "red";
}


// function addData(chart,data) {


//     chart.data.datasets.forEach((dataset) => {
//         dataset.data=data.datasets.data;
//     });
//     chart.update();


// }

function removeData(chart, datas) {
    console.log("updated");
    let newValues = datas[0].data;
    newValues = newValues.map((v) => {
        if (v === undefined) {
            return 0;
        }
        else {
            return v;
        }
    });

    chart.data.datasets.forEach((dataset) => {
        dataset.label = city;
        dataset.data = dataset.data.map((d, index) => {

            return newValues[index];
        });
    });
    chart.update();


}
