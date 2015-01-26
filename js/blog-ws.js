$.ajax({
    url: "http://localhost:8080/ProjectBlog/webresources/article/status/0",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    headers: {
        Accept: "application/json"
    },
    success: [afficherArticle]
});

function afficherArticle(articles) {
    var data = articles;
    var contentHTML = '';

    $.each(data, function (i, article) {
        contentHTML = "<button style='float: right;' class='btn btn-info' onclick='afficherComment(" + article.id + ")'>Afficher les commentaires</button>"

                + "<h2 class='post-title'>" + article.title + "</h2>"
                + "<p class='post-subtitle'>" + article.content + "</p>"
                + "<div id='commentaireArticle" + article.id + "'></div>"
                + "<p class='post-meta'>Poste par " + article.a_ecrit.firstname + ' ' + article.a_ecrit.lastname + " le " + article.published_on + "</p>"
                + "<div class='form-inline'>"
                + "<input id='idarticle" + article.id + "' type='hidden' value='" + article.id + "'>"
                + "<input style='width: 85%;' id='commente" + article.id + "' type='text' required='' placeholder='Ecrire un commentaire...' class='form-control'>"
                + "<button class='btn btn-primary' onclick='ajouterComment(" + article.id + ")'>Commenter</button>"
                + "</div>"

                + "<hr>";

        $("#articlePoste").append(contentHTML);
    });
}

//Ajouter commentaire
function ajouterComment(input) {
    var commentaire = new Object();
    var article = new Object();
    var user = new Object();

    article.id = $("#idarticle" + input).val();
    user.id = 2;

    commentaire.comment = $("#commente" + input).val();
    commentaire.commented_date = "";

    commentaire.a_commente = user;
    commentaire.a_article = article;

    ajouterCommentaire(commentaire);
}

//Ajout commentaire via ajax
function ajouterCommentaire(comment) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/ProjectBlog/webresources/comment",
        data: JSON.stringify(comment),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log("OK");
            window.location.reload(true);
        }
    });
}

//Afficher les commentaires selon article via ajax
function afficherComment(idArticle) {
    $.ajax({
        url: "http://localhost:8080/ProjectBlog/webresources/comment/search/" + idArticle,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        headers: {
            Accept: "application/json"
        },
        success: [afficherCommentaire]
    });
}

//Afficher commentaire
function afficherCommentaire(comment) {
    var data = comment;
    var commentaireHTML = '';

    $.each(data, function (i, commentaire) {

        commentaireHTML += "<blockquote>" + commentaire.comment + "</blockquote>";

        $("#commentaireArticle" + commentaire.a_article.id).html(commentaireHTML);
    });
}

//Supprimer article
function supprimerArticle(idArticle) {

    $.ajax({
        url: "http://localhost:8080/ProjectBlog/webresources/article/" + idArticle,
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
