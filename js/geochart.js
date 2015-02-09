// ------------- region geochart -------------
// ------------- --------------- -------------
$.ajax({
    url: "http://localhost:8080/ProjectBlog/webresources/article/countArticleByCountry",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    headers: {
        Accept: "application/json"
    },
    success: [drawRegionsMap]
});

google.load("visualization", "1", {packages: ["geochart"]});

function drawRegionsMap(json) {

    var tableau = new Array;
    tableau.push(['Country', 'Nombre d\'articles']);
    $.each(json, function (i, ligne) {
        tableau.push(ligne);
    });


    var data = google.visualization.arrayToDataTable(tableau);

    var options = {};

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
}