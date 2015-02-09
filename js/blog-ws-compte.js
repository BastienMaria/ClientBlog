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

        window.setTimeout(function ()
        {
            window.location.reload(true);
        }, 2000);
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

        tbody += "<td><input id='title" + json.id + "' type='text' value='" + json.title + "'></td>"
                + "<td><input id='keywords" + json.id + "' type='text' value='" + json.keywords + "'></td>"
                + "<td><input id='content" + json.id + "' type='text' value='" + json.content + "'></td>"
                + "<td><button id='#modif' class='btn btn-default' onclick='modifArticle(" + json.id + ',' + json.published_on + ',' + json.position_longitude + ',' + json.position_latitude + ',' + '"' + json.position_name + '"' + ',' + json.a_ecrit.id + ")'>Modifier</button></td>"
                + "<td><input id='photo" + json.id + "' type='hidden' value='" + json.photo + "'></td>";
        tbody += "<tr>";
    });

    $("#articleUser").html(tbody);
}

function modifArticle(id, published, long, lat, pos, role) {

    var article = new Object();
    var user = new Object();

    article.id = id;

    article.title = $("#title" + id).val();
    article.keywords = $("#keywords" + id).val();
    article.content = $("#content" + id).val();
    article.photo = $("#photo" + id).val();
    article.published_on = published;
    article.status = "WAITFORVALIDATION";
    article.position_longitude = long;
    article.position_latitude = lat;
    article.position_name = pos;
    user.id = role;
    article.a_ecrit = user;

    $.ajax({
        url: "http://localhost:8080/ProjectBlog/webresources/article/" + id,
        type: "PUT",
        data: JSON.stringify(article),
        dataType: "json",
        contentType: "application/json",
        headers: {
            Accept: "application/json"
        },
        success: function (data) {
            $("#alertArticle").html('<div class="alert alert-info" role="alert">Article modifié !</div>');
            window.setTimeout(function ()
            {
                window.location.reload(true);
            }, 2000);
        }
    });


}

//modif compte utilisateur
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

//Modif utilisateur
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
            $("#alert").html('<div class="alert alert-danger" role="alert">Erreur !</div>');
        }
    });
}

