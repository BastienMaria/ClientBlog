//ajout d'article
$("#formArticle").submit(function (event) {

    var article = new Object();
    var user = new Object();
    user.id = 2;
    article.title = $("#title").val();
    article.keywords = $("#tag").val();
    article.content = $("#content").val();
    article.status = "WAITFORVALIDATION";
    article.a_ecrit = user;

    event.preventDefault();
    ajouterArticle(article);
});

$.ajax({
    url: "http://localhost:8080/ProjectBlog/webresources/article",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    headers: {
        Accept: "application/json"
    },
    success: [afficherArticle]
});

function afficherArticle(json) {
    var data = json;
    var contentHTML = '';

    $.each(data, function (i, item) {
        contentHTML = "<h2 class='post-title'>" + item.title + "</h2>"
                + "<p class='post-subtitle'>" + item.content + "</p>";
        for (var key in item.comments) {
            if (item.comments[key] === undefined) {
                contentHTML += "";
            }
            else {
                contentHTML += "<blockquote>" + item.comments[key].comment + "</blockquote>"
            }
        }
        contentHTML += "<p class='post-meta'>Posté par " + item.a_ecrit.firstname + ' ' + item.a_ecrit.lastname + " le " + item.published_on + "</p>"
                + "<input id='textinput' name='textinput' type='text' placeholder='Ecrire un commentaire...' class='form-control input-md'><button class='btn btn-primary'>Commenter</button>"
                + "<button class='btn btn-danger' onclick='supprimerArticle(" + item.id + ")'>Supprimer</button>"
                + "<hr>";

        $("#articlePoste").append(contentHTML);
    });
}

function supprimerArticle(articleID) {

    $.ajax({
        url: "http://localhost:8080/ProjectBlog/webresources/article/" + articleID,
        type: "DELETE",
        contentType: "application/json",
        headers: {
            Accept: "application/json"
        },
        success: function () {
            window.location.reload(true);
        }
    });
}

function ajouterArticle(input) {

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/ProjectBlog/webresources/article",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log("OK");
            $("#formArticle")[0].reset();
            $("#alert").append('<div class="alert alert-success" role="alert">Votre article a bien été ajouté!</div>');
        },
        failure: function (errMsg) {
            console.log("KO");
            $("#alert").append('<div class="alert alert-danger" role="alert">Erreur!</div>');
        }
    });
}


