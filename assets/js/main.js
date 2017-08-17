$(document).ready(function() {
    $(".button-collapse").sideNav();


// INICIO FUNCIONES SEARCH
    var miUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id=';
	var key = '3613a4477cdfae05247764cc24f280df';
	var code = ['67','73','83','97','257','280'];

	code.forEach(function(e){
			$.ajax({
				url: miUrl + e + '&entity_type=city&apikey=' + key,
				type: 'GET',
				dataType: 'json'
				//data: {param1: 'value1'},
			})
			.done(function(res){
				res.restaurants.forEach(function(element){
					var nombre = element.restaurant.name;
					var img = element.restaurant.thumb;
					var elId = element.restaurant.id;
					var tipo = element.restaurant.cuisines;
					var city = element.restaurant.location.city;
					var cityId = element.restaurant.location.city_id;
					var comuna = element.restaurant.location.locality;
					var direccion = element.restaurant.location.address;
					var moneda = element.restaurant.currency;
					var costo = element.restaurant.average_cost_for_two;
					var calificacion = element.restaurant.user_rating.aggregate_rating;

					if(img == ""){
						img = 'http://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/kyaraben-comida-kawaii.jpg';
					}


					/*var estructura = ('<li id="'+ elId +'"><img src="'+ img +'"><p>'+ nombre  +'</p><p>'+ comuna  +'</p></li>');*/

					var estructura = ('<div class="col s4 m4" id="' + elId +'"> ' +
							          	'<div class="card">' +
							            	'<div class="card-image">'+
							              		'<img class="img-style" src="' + img + '">' + 
							            	'</div>' +
							            	'<div class="card-content">' +
							              		'<p class="left-align"><i class="fa fa-cutlery" aria-hidden="true"></i> ' + nombre + '</p>' +
							              		'<span>' + comuna + '</span>' +
							            	'</div>' +
							          	'</div>' +
							        '</div>');


					$('.card').css('height','20vh');
					$('.card').css('padding','0');
					$('.card-image').css('height','10vh');

					$('.elegir').append('<option value="'+ city +'" id="'+cityId+'">'+ city +'</option>');

					var map = {};
					$('.elegir option').each(function () {
					    if (map[this.value]) {
					        $(this).remove()
					    }
					    map[this.value] = true;
					})

					$('.lista').append(estructura);


					$(".filtrar").click(function(){

						var elegir = $(".elegir").val();
						if (elegir == city){
							$('.lista').hide();
							$('.lista2').append(estructura);
							
						}

	
					});

					$('#'+ elId).click(function() {
						$('.end').empty();
						$('.end').append('<div class="row center orange">Nombre</div>'+
										    '<div class="row center">'+
										      '<h6 class="naranjo">Address</h6>'+
										      '<p>l'+ direccion +'</p>'+
										      '<h6 class="naranjo">Price</h6>'+
										      '<p>'+ moneda+costo +'</p>'+
										      '<h6 class="naranjo">Rating</h6>'+
										      '<p>'+ calificacion +'</p>'+
										    '</div>');

					});
			    });
			})
			.fail(function() {
				console.log("error");
			})
			
		});
// FIN FUNCIONES SEARCH
});