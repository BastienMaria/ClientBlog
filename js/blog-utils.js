/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function () {
    $('#fileInput').on('change', handleFileSelect);
});

var handleFileSelect = function (evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload = function (readerEvt) {
            var binaryString = readerEvt.target.result;
            $("#base64").val(btoa(binaryString));
        };

        reader.readAsBinaryString(file);
    }
};

//Si le nombre de jours vaut 0, le cookie sera effacé à la fermeture du navigateur. Si vous mettez un nombre négatif de jours, le cookie sera effacé immédiatement.
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else {
        var expires = "";
    }

    document.cookie = name + "=" + value + expires + "; path=/";

}

function readJsonCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return JSON.parse(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}


$(function () {
    if (readJsonCookie("user") !== null) {
        $("#menuDeconnexion").show();
        $("#menuName").show();
        $("#menuArticle").show();
        $("#menuUser").hide();
        $("#menuConnect").hide();
        $("#menuName").html(readJsonCookie("user").firstname + ' ' + readJsonCookie("user").lastname);
        if (readJsonCookie("user").a_role.name === "Admin") {
            $("#menuName").attr("href", "./admin.html");
        }
        if (readJsonCookie("user").a_role.name === "User") {
            $("#menuName").attr("href", "./compte.html");
        }
    } else {
        $("#menuDeconnexion").hide();
        $("#menuName").hide();
        $("#menuArticle").hide();
        $("#menuUser").show();
        $("#menuConnect").show();
    }

    $("#menuDeconnexion").click(function () {
        eraseCookie("user");
        window.location.reload(true);
    });
}
);

