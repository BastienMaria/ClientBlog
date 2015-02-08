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

//création compte utilisateur
$("#formCompte").submit(function (event) {

    var user = new Object();
    var role = new Object();
    var avatar = $('input[name="avatarImg"]')[0].files[0];

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
            $("#alert").append('<div class="alert alert-success" role="alert">Compte modifié !</div>');
        },
        failure: function (errMsg) {
            console.log("KO");
            $("#alert").append('<div class="alert alert-danger" role="alert">Erreur !</div>');
        }
    });
}

