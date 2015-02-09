$(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position)
        {
            $("#latitude").val(position.coords.latitude);
            $("#longitude").val(position.coords.longitude);
        });
    } else {
        $("#latitude").val(100.3605);
        $("#longitude").val(59.12199);
    }
});

//Ajout d'article via form
$("#formArticle").submit(function (event) {
    var article = new Object();
    var user = new Object();

    user.id = readJsonCookie("user").id;
    article.title = $("#title").val();
    article.keywords = $("#tag").val();
    article.content = $("#content").val();
    article.status = "WAITFORVALIDATION";
    article.published_on = new Date();
    article.a_ecrit = user;
    article.position_latitude = $("#latitude").val();
    article.position_longitude = $("#longitude").val();
    article.photo = $("#base64").val();
   
    event.preventDefault();
    ajouterArticle(article);
});


//Ajout avec ajax
function ajouterArticle(article) {

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/ProjectBlog/webresources/article",
        data: JSON.stringify(article),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#formArticle")[0].reset();
            $("#alert").html('<div class="alert alert-success" role="alert">Votre article a bien été ajouté !</div>');
            window.setTimeout(function ()
            {
                document.location.href = "./index.html";
            }, 2000);
        },
        failure: function (errMsg) {
            $("#alert").html('<div class="alert alert-danger" role="alert">Erreur !</div>');
        }
    });
}
