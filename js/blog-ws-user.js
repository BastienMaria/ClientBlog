//création compte utilisateur
$("#formUser").submit(function (event) {

    var user = new Object();
    var role = new Object();
    var avatar = $('input[name="avatarImg"]')[0].files[0];

    role.id = 4;
    user.username = $("#username").val();
    user.password = $("#password").val();
    user.firstname = $("#firstname").val();
    user.lastname = $("#lastname").val();

    user.user_status = "ENABLED";
    user.about = "About me";
    user.a_role = role;

    console.log("user : " + JSON.stringify(user));

    event.preventDefault();
    creerUtilisateur(user);
});

//Affichage aperçu vignette
$("#fileInput").change(function () {
    convertFileToBase64(this);
});

//Creation utilisateur
function creerUtilisateur(user) {

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/ProjectBlog/webresources/users",
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log("OK");
            $("#formUser")[0].reset();
            $("#alert").append('<div class="alert alert-success" role="alert">Compte créé !</div>');
        },
        failure: function (errMsg) {
            console.log("KO");
            $("#alert").append('<div class="alert alert-danger" role="alert">Erreur !</div>');
        }
    });
}


//check connection
$("#connect").submit(function (event) {
    event.preventDefault();
    var username = $("#login").val();
    console.log('username   :    ' + username);
    var mdp = $("#mdp").val();
    console.log('mdp   :    ' + mdp);
    connect(username, mdp);
});

function connect(username, mdp) {
    $.ajax({
        url: "http://localhost:8080/ProjectBlog/webresources/users/check/",
        type: "POST",
        data: {
            username: username,
            mdp: mdp
        },
        success: function (data) {

            if (data === false) {
                $("#alertConnect").append('<div class="alert alert-danger" role="alert">Mot de passe ou identifiant non valide !</div>');
            } else {
                //création du cookie utilisateur
                createCookie("user", JSON.stringify(data), 0);
                //redirection
                document.location.href = "./index.html";

                var cookie = readJsonCookie("user");
                console.log(cookie.firstname);

            }
        },
        failure: function (errMsg) {
            console.log("failure")
        }
    });
}
