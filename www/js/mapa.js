$(document).ready(function(){
   window.onload = function() {
        function initialize() {

        var latlng = new google.maps.LatLng(20.6956025,-103.2345468);
            var mapOptions = {
                zoom: 17,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            }
            var map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
            setMarkers(map, marcadores);
        }

        var marcadores = [
            ['1',20.695417, -103.235847,'<strong>Sorgo</strong>'],
            ['2',20.694783, -103.233552,'<strong>Maíz</strong>'],
            ['3',20.695606, -103.235724,'<strong>Granja</strong>'],
            ['4',20.697413, -103.235778,'<strong style="font-size:20px;">Usuario</strong>'],
        ];

        var infowindow;
        function setMarkers(map, marcadores) {

            for (var i = 0; i < marcadores.length; i++) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(marcadores[i][1], marcadores[i][2]),
                    map: map
                });

                var infowindow = new google.maps.InfoWindow({
                  content: marcadores[i][3],
                  maxWidth: 160
                });
                infowindow.open(map, marker);
                (function(i, marker) {
                    infowindow.open(map, marker);
                })(i, marker);
                
                /*var myLatLng = new google.maps.LatLng(marcadores[i][1], marcadores[i][2]);
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: marcadores[i][0],
                });
                (function(i, marker) {
                    google.maps.event.addListener(marker,'click',function() {
                        if (!infowindow) {
                            infowindow = new google.maps.InfoWindow();
                        }
                        infowindow.setContent(marcadores[i][3]);
                        infowindow.open(map, marker);
                    });
                })(i, marker);*/
            }
        };
        initialize();
    }

});