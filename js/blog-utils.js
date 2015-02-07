/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function convertFileToBase64(input) {

    if (input.files && input.files[0]) {
        var FR = new FileReader();

        FR.onloadend = function () {
            return FR.result;
        };

        FR.onload = function (e) {
            $('#img').attr("src", e.target.result);
            $('#base').text(e.target.result);
        };
        FR.readAsDataURL(input.files[0]);
    }

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