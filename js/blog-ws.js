/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
    var contentHTML;


    $.each(data, function (i, item) {
        var contentHTML = "<h2 class='post-title'>"
                + item.title + "</h2>" + "<h3 class='post-subtitle'>"
                + item.content + "</h3>" + "<p class='post-meta'>Posté par " + item.a_ecrit.firstname + ' ' + item.a_ecrit.lastname + " le " + item.published_on + "</p>"
                + "<input id='textinput' name='textinput' type='text' placeholder='Ecrire un commentaire...' class='form-control input-md'><button class='btn btn-primary'>Commenter</button>"
                + "<hr>";

//console.log(contentHTML);
        $("#articlePoste").append(contentHTML);
    });


}


