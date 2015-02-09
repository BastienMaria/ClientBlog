$.ajax({
    url: "http://localhost:8080/ProjectBlog/webresources/users/" + readJsonCookie("user").id,
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    headers: {
        Accept: "application/json"
    },
    success: function (data) {
        $("#username").val(data.username);
        $("#password").val(data.password);
        $("#firstname").val(data.firstname);
        $("#lastname").val(data.lastname);
        $("#about").val(data.about);
    }
});

$.ajax({
    url: "http://localhost:8080/ProjectBlog/webresources/article/user/" + readJsonCookie("user").id,
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    headers: {
        Accept: "application/json"
    },
    success: [afficherTableArticleUser]
});

function afficherTableArticleUser(json) {

    var tbody = "<tr>";

    $.each(json, function (i, json) {

        tbody += "<td><input type='text' value='" + json.title + "'></td>"
                + "<td><input type='text' value='" + json.keywords + "'></td>"
                + "<td><input type='text' value='" + json.published_on + "'></td>"
                + "<td><input type='text' value='" + json.content + "'></td>"

                + "<td><button id='#modif' class='btn btn-info' onclick='modifArticle(" + json.id + ',' + json.position_longitude + ',' + json.position_latitude + ',' + json.position_name + ',' + json.a_ecrit.id + ")'>Modifier</button></td>"
                + "<td><input type='hidden'value='" + json.photo + "'></td>";
        tbody += "<tr>";
    });
    
    $("#articleUser").html(tbody)


    /*$('#articleUser tbody').on('click', '#modif', function () {
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
     
     });*/
}

//création compte utilisateur
$("#formCompte").submit(function (event) {

    var user = new Object();
    var role = new Object();

    user.id = readJsonCookie("user").id;
    user.username = $("#username").val();
    user.password = $("#password").val();
    user.firstname = $("#firstname").val();
    user.lastname = $("#lastname").val();
    user.about = $("#about").val();
    user.last_connect = new Date();
    user.user_status = "ENABLED";

    role.id = 4;
    user.a_role = role;

    event.preventDefault();
    modifierUtilisateur(user);
});

//Affichage aperçu vignette
$("#fileInput").change(function () {
    convertFileToBase64(this);
});

//Creation utilisateur
function modifierUtilisateur(user) {

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/ProjectBlog/webresources/users/" + readJsonCookie("user").id,
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#alert").html('<div class="alert alert-success" role="alert">Compte modifié !</div>');
        },
        failure: function (errMsg) {
            console.log("KO");
            $("#alert").html('<div class="alert alert-danger" role="alert">Erreur !</div>');
        }
    });
}

