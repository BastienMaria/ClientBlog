/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function convertFileToBase64(input) {

//    if (input.files && input.files[0]) {
//        var FR = new FileReader();
//
//        FR.onloadend = function () {
//            return FR.result;
//        };
//
//        FR.onload = function (e) {
//            $('#img').attr("src", e.target.result);
//            $('#base').text(e.target.result);
//        };
//        FR.readAsDataURL(input.files[0]);
//    }

    var ready = false;
    var result = '';

    var check = function () {
        if (ready === true) {
            // do what you want with the result variable
            return;
        }
        setTimeout(check, 1000);
    }

    check();

    var reader = new FileReader();
    reader.onloadend = function (evt) {
        // file is loaded
        result = evt.target.result;

        ready = true;
    };
    reader.readAsDataURL(input);

    return result;

}

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
    } else {
        $("#menuDeconnexion").hide();
        $("#menuName").hide();
        $("#menuArticle").hide();
        $("#menuUser").show();
        $("#menuConnect").show();
    }
    if(readJsonCookie("user").a_role.name === "Admin"){
        $("#menuName").attr("href", "./admin.html");
    }
    $("#menuDeconnexion").click(function () {
        eraseCookie("user");
        window.location.reload(true);
    });
});

