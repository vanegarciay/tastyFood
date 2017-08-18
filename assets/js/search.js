//contador para ir sumando los restaurants agregados a fovitos -- en el html profile agregue una clase add-fav
var count = 0;
$(document).ready(function() {
// INICIO FUNCIONES SEARCH
    var miUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id=';
	var key = '0546cb6852fa227b36383394dae09f98';
	var code = ['67','73','83','97','257','280'];

	code.forEach(function(e){
			$.ajax({
				url: miUrl + e + '&entity_type=city' ,
				type: 'GET',
				beforeSend: function(request) {
                    request.setRequestHeader("user-key", key);
                },
				dataType: 'json'
				//data: {param1: 'value1'},
			})
			.done(function(res){
				res.restaurants.forEach(function(element){
					var elNombre = element.restaurant.name;
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

					$('.end').hide();

					if(img == ""){
						img = 'http://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/kyaraben-comida-kawaii.jpg';
					}

					


					//Estructuras de información general de todos los restaurants

					var estructura = ('<div class="col s4 m4" id="' + elId +'"> ' +
							          	'<div class="card">' +
							            	'<div class="card-image">'+
							              		'<img class="img-style" src="' + img + '">' + 
							            	'</div>' +
							            	'<div class="card-content">' +
							              		'<div class="left-align nombre col s4"><p> ' + elNombre +  '</p></div>' +
							              		'<div class="col s8 comuna right-align"><p>' + comuna + '</p><i class="fa fa-cutlery" aria-hidden="true"></i></div>' +
							            	'</div>' +
							          	'</div>' +
							        '</div>');

					var estructura2 = ('<div class="col s4 m4" id="footer-' + elId +'"> ' +
							          	'<div class="card">' +
							            	'<div class="card-image">'+
							              		'<img class="img-style" src="' + img + '">' + 
							            	'</div>' +
							            	'<div class="card-content">' +
							              		'<div class="left-align nombre col s4"><p> ' + elNombre +  '</p></div>' +
							              		'<div class="col s8 comuna right-align"><p>' + comuna + '</p><i class="fa fa-cutlery" aria-hidden="true"></i></div>' +
							            	'</div>' +
							          	'</div>' +
							        '</div>');

					$('.elegir').append('<option value="'+ city +'" id="'+cityId+'">'+ city +'</option>');

					var mapSearch = {};
					$('.elegir option').each(function () {
					    if (mapSearch[this.value]) {
					        $(this).remove()
					    }
					    mapSearch[this.value] = true;
					});

					$('.lista').append(estructura);

					$('#'+ elId).click(function() {
						$('.end').show();
						$('.end').empty();
						//Estructura contenido footer
						$('.end').append('<div class="row center end-nombre">'+
												'<div class="col s12"><span class="center">' + elNombre + '</span>'+
													'<button id="'+elId + '-add"  class="add-cor"><i class="fa fa-heart"  aria-hidden="true"></i></button>'+
												'</div>'+
											  '</div>' +
										     '<div class=" center end-datos">'+
										     	'<div class="col s12">'+
											      	'<h6 class="naranjo">Address</h6>'+
											      	'<p>l'+ direccion +'</p>'+
											      	'<h6 class="naranjo">Price</h6>'+
											      	'<p>'+ moneda+costo +'</p>'+
											      	'<h6 class="naranjo">Rating</h6>'+
											      	'<p>'+ calificacion +'</p>'+
											     '</div>'+
										    '</div>');
					});


					$(".filtrar").click(function(){
						var elegir = $(".elegir").val();
						if (elegir == city){

							$('.lista').hide();
							$('.lista2').append(estructura2);
							$('.end').empty();
						}

						$('#footer-'+ elId).click(function() {
							$('.end').show();
							$('.end').empty();
							$('.end').append('<div class="row center end-nombre">'+
												'<div class="col s12"><span class="center">' + elNombre + '</span>'+
													'<button id="'+elId + '-add" class="add-cor"><i class="fa fa-heart"  aria-hidden="true"></i></button>'+
												'</div>'+
											  '</div>' +
										      '<div class="row center end-datos">'+
										     	'<div class="col s12" >'+
											      	'<h6 class="naranjo">Address</h6>'+
											      	'<p>l'+ direccion +'</p>'+
											      	'<h6 class="naranjo">Price</h6>'+
											      	'<p>'+ moneda+costo +'</p>'+
											      	'<h6 class="naranjo">Rating</h6>'+
											      	'<p>'+ calificacion +'</p>'+
											     '</div>'+
										      '</div>');
	
						});
					});

					//Al hacer click en el boton con corazon fuera suamndo el contador y los elementos guardados
					$('#'+ elId + '-add').click(function() {
						count++;
						var conta = localStorage.setItem('contador', count);
						console.log(count);
						var namenom = localStorage.setItem(('nameres' + count),elNombre);
					});	

								
			    });
			})
			.fail(function() {
				console.log("error");
			})
			
		});

//"se muestra contador guardado"
	var conta = localStorage.getItem('contador');
//"for que itere sobre las x veces del contador y sume todos los restaurants agregados"
	for(var i = 1; i <= conta; i++){
		$('.add-fav').append('<div class="col s4">' + 
                				'<p>'+ localStorage.getItem('nameres' + i) +'</p>' +
            				 '</div>');
		}
// FIN FUNCIONES SEARCH

});