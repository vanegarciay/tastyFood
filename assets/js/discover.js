function init() {
    $(document).ready(function() {
        var cuisine = "";
        var latitud = -33.4724728;
        var longitud = -70.6058022;
        var mapZoom = 12;
        var maximo = 50;
        var kms = 10000;
        /* API variables */
        var key = 'fc6f2df7d97da85f1bf971bf464fe472';
        
        llenarSelectDeCuisines(key);
        marcarCousinesEnMapa(key);

        var map = new google.maps.Map(document.getElementById("map"));
        resetMap();

        $(".select select").on("change", function(){
            cuisine = $(this).val();
            resetMap();
        });

        function resetMap() {
            map = new google.maps.Map(document.getElementById("map"),{
                zoom: mapZoom,
                center: {lat: latitud, lng: longitud},
                mapTypeControl: true,
                zoomControl: true,
                streetViewControl: true
            });

            google.maps.event.addListener(map, 'zoom_changed', function() {
                mapZoom = map.getZoom();
            });

            google.maps.event.addListener(map, 'idle', function(event){
                latitud = map.getCenter().lat();
                longitud = map.getCenter().lng();
            });

            marcarCousinesEnMapa(key);
        }

        function llenarSelectDeCuisines(key) {
            var url = 'https://developers.zomato.com/api/v2.1/cuisines?';
            
            $.ajax({
                url: url,
                type: 'GET',
                beforeSend: function(request) {
                    request.setRequestHeader("user-key", key);
                },
                dataType: 'json',
                data: {
                    'lat': latitud,
                    'lon': longitud
                }
            })
            .done(function(response){
                //console.log(response.cuisines);
                response.cuisines.forEach(function(single) {
                    var id = single.cuisine.cuisine_id;
                    var cuisine = single.cuisine.cuisine_name;
                    var option = `<option value="${id}">${cuisine}</option>`;
                    $(".select select").append(option);
                })
            })
            .fail(function() {
                console.log("error");
            });
        }

        function marcarCousinesEnMapa(key) {
            var url = 'https://developers.zomato.com/api/v2.1/search?';

            $.ajax({
                url: url,
                type: 'GET',
                beforeSend: function(request) {
                    request.setRequestHeader("user-key", key);
                },
                dataType: 'json',
                data: {
                    'count': maximo,
                    'lat': latitud,
                    'lon': longitud,
                    'radius': kms,
                    'cuisines': cuisine
                }
            })
            .done(function(response){
                response.restaurants.forEach(function(single) {
                    var lat = single.restaurant.location.latitude;
                    var lon = single.restaurant.location.longitude;
                    marcarRestaurant(lat, lon);
                })
            })
            .fail(function() {
                console.log("error");
            })
        }

        function marcarRestaurant(lat, lon) {
            var marker = crearMarcador(map);

            marker.setPosition(new google.maps.LatLng(lat,lon));
            marker.setVisible(true);
        }

        function crearMarcador(map) {
            var icono = {
                url: 'https://lh3.ggpht.com/QZjCEmi1T4U62vjYCQ-78KDEYwPfFXSv27_XU-MmE9fNtprQ_Z3KlyrZJOw3SrdTmw=w300',
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            };

            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                icon: icono,
                anchorPoint: new google.maps.Point(0, -29)
            });

            return marker;
        }

    });
}