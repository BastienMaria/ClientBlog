$.ajax({
    url: "http://localhost:8080/ProjectBlog/webresources/users",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    headers: {
        Accept: "application/json"
    },
    success: [afficherTableUsers]
});

$.ajax({
    url: "http://localhost:8080/ProjectBlog/webresources/article/status/2",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    headers: {
        Accept: "application/json"
    },
    success: [afficherTableArticle]
});


function afficherTableUsers(json) {
    var JSONParam = new Object;
    var datajson = new Array();

    $.each(json, function (i, json) {
        var jsonObject = new Array();

        jsonObject.push(json.username);
        jsonObject.push(json.firstname);
        jsonObject.push(json.lastname);
        jsonObject.push(json.id);
        jsonObject.push(json.password);
        jsonObject.push(json.last_connect);
        jsonObject.push(json.a_role.id);
        jsonObject.push(json.photo);
        jsonObject.push(json.about);

        datajson.push(jsonObject);

    });

    JSONParam.data = datajson;
    JSONParam.iDisplayLength = 5;
    JSONParam.sDom = '<"top"f>t<"bottom"p><"clear">';
    JSONParam.columnDefs = [{
            "targets": -1,
            "data": null,
            "defaultContent": "<button id='active' class='btn btn-primary'>Enable</button><button id='desactive' class='btn btn-danger'>Disable</button>"
        }];

    var table = $('#userAdmin').DataTable(JSONParam);
    $('#userAdmin tbody').on('click', '#active', function () {
        var dataselect = table.row($(this).parents('tr')).data();
        var jsonuser = new Object();
        var jsonrole = new Object();

        jsonuser.id = dataselect[3];
        jsonuser.username = dataselect[0];
        jsonuser.lastname = dataselect[2];
        jsonuser.firstname = dataselect[1];
        jsonuser.user_status = "ENABLED";
        jsonuser.password = dataselect[4];
        jsonuser.last_connect = dataselect[5];
        jsonuser.a_role = jsonrole;
        jsonrole.id = dataselect[6];
        jsonuser.photo = dataselect[7];
        jsonuser.about = dataselect[8];

        $.ajax({
            url: "http://localhost:8080/ProjectBlog/webresources/users/" + dataselect[3],
            type: "PUT",
            data: JSON.stringify(jsonuser),
            dataType: "json",
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            },
            success: function (data) {
                $("#alertUser").html('<div class="alert alert-info" role="alert">Compte activé !</div>');
            }
        });

    });

    $('#userAdmin tbody').on('click', '#desactive', function () {
        var dataselect = table.row($(this).parents('tr')).data();
        var jsonuser = new Object();
        var jsonrole = new Object();

        jsonuser.id = dataselect[3];
        jsonuser.username = dataselect[0];
        jsonuser.lastname = dataselect[2];
        jsonuser.firstname = dataselect[1];
        jsonuser.user_status = "DISABLED";
        jsonuser.password = dataselect[4];
        jsonuser.last_connect = dataselect[5];
        jsonrole.id = dataselect[6];
        jsonuser.a_role = jsonrole;
        jsonuser.photo = dataselect[7];
        jsonuser.about = dataselect[8];

        $.ajax({
            url: "http://localhost:8080/ProjectBlog/webresources/users/" + dataselect[3],
            type: "PUT",
            data: JSON.stringify(jsonuser),
            dataType: "json",
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            },
            success: function (data) {
                $("#alertUser").html('<div class="alert alert-info" role="alert">Compte désactivé !</div>');
            }
        });
    });
}

function afficherTableArticle(json) {
    var JSONParam = new Object;
    var datajson = new Array();

    $.each(json, function (i, json) {
        var jsonObject = new Array();
        
        jsonObject.push(json.title);
        jsonObject.push(json.keywords);
        jsonObject.push(json.published_on);
        jsonObject.push(json.content);
        jsonObject.push(json.id);
        jsonObject.push(json.photo);
        jsonObject.push(json.position_longitude);
        jsonObject.push(json.position_latitude);
        jsonObject.push(json.position_name);
        jsonObject.push(json.a_ecrit.id);

        datajson.push(jsonObject);

    });

    JSONParam.data = datajson;
    JSONParam.destroy = true;
    JSONParam.iDisplayLength = 5;
    JSONParam.sDom = '<"top"f>t<"bottom"p><"clear">';
    JSONParam.columnDefs = [{
            "targets": -1,
            "data": null,
            "defaultContent": "<button id='publie' class='btn btn-primary'>Validate</button><button id='report' class='btn btn-danger'>Reported</button>"
        }];

    var table = $('#articleAdmin').DataTable(JSONParam);
    $('#articleAdmin tbody').on('click', '#publie', function () {
        var dataselect = table.row($(this).parents('tr')).data();
        var jsonarticle = new Object();
        var jsonuser = new Object();

        jsonarticle.id = dataselect[4];

        jsonarticle.title = dataselect[0];
        jsonarticle.keywords = dataselect[1];
        jsonarticle.published_on = dataselect[2];
        jsonarticle.content = dataselect[3];
        jsonarticle.photo = dataselect[5];
        jsonarticle.position_longitude = dataselect[6];
        jsonarticle.position_latitude = dataselect[7];
        jsonarticle.position_name = dataselect[8];
        jsonarticle.status = "PUBLISHED";
        jsonuser.id = dataselect[9];
        jsonarticle.a_ecrit = jsonuser;

        $.ajax({
            url: "http://localhost:8080/ProjectBlog/webresources/article/" + dataselect[4],
            type: "PUT",
            data: JSON.stringify(jsonarticle),
            dataType: "json",
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            },
            success: function (data) {
                $("#alertArticle").html('<div class="alert alert-info" role="alert">Article publié !</div>');
                window.location.reload(true);
            }
        });

    });

    $('#articleAdmin tbody').on('click', '#report', function () {
        var dataselect = table.row($(this).parents('tr')).data();
        var jsonarticle = new Object();
        var jsonuser = new Object();

        jsonarticle.id = dataselect[4];

        jsonarticle.title = dataselect[0];
        jsonarticle.keywords = dataselect[1];
        jsonarticle.published_on = dataselect[2];
        jsonarticle.content = dataselect[3];
        jsonarticle.photo = dataselect[5];
        jsonarticle.position_longitude = dataselect[6];
        jsonarticle.position_latitude = dataselect[7];
        jsonarticle.position_name = dataselect[8];
        jsonarticle.status = "REPORTASABUSED";
        jsonuser.id = dataselect[9];
        jsonarticle.a_ecrit = jsonuser;

        $.ajax({
            url: "http://localhost:8080/ProjectBlog/webresources/article/" + dataselect[4],
            type: "PUT",
            data: JSON.stringify(jsonarticle),
            dataType: "json",
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            },
            success: function (data) {
                $("#alertArticle").html('<div class="alert alert-danger" role="alert">Article reporté !</div>');
                window.location.reload(true);
            }
        });
    });
}

$.ajax({
    url: "http://localhost:8080/ProjectBlog/webresources/article/countArticleByTag",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    headers: {
        Accept: "application/json"
    },
    success: [drawChart]
});


function drawChart(json) {
    var table = new Array;
    table.push(['Tag', 'Nombre']);
    $.each(json, function (i, ligne) {
        table.push(ligne);
    });


    var data = google.visualization.arrayToDataTable(table);

    var options = {
        title: 'Répartition des tags'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}

google.load("visualization", "1", {packages: ["corechart"]});