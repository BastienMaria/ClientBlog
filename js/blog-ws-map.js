function initialize() {

    var myLatlng = new google.maps.LatLng(49.42831, 44.11050);
    var mapOptions = {
        zoom: 3,
        center: myLatlng
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    $.ajax({
        url: "http://localhost:8080/ProjectBlog/webresources/article",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        headers: {
            Accept: "application/json"
        },
        success: function (data) {
            $.each(data, function (i, data) {

                if (data.status === "PUBLISHED") {

                    var contentString = '<div id="content">' +
                            '<div id="siteNotice">' +
                            '</div>' +
                            '<h1 id="firstHeading" class="firstHeading">' + data.title + '</h1>' +
                            '<div id="bodyContent">' +
                            '<p>' + data.content + '</p>' +
                            '<p>Auteur : ' + data.a_ecrit.firstname + ' ' + data.a_ecrit.lastname + '</p>' +
                            '</div>' +
                            '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(data.position_latitude, data.position_longitude),
                        map: map,
                        title: data.title
                    });

                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.open(map, marker);
                    });
                }
            });
        }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

function addMarkers() {

}


