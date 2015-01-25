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