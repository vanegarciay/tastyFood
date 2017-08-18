$(document).ready(function() {  //inicializar navbar de materialize
    $(".button-collapse").sideNav();



// INICIO FUNCIONES SEARCH
    var miUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id=';
	var key = '354485b8128e52e86b87366a6444882c';
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

					$('.end').hide();

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
							              		'<div class="left-align nombre col s4"> ' + nombre +  '</div>' +
							              		'<div class="col s8 comuna right-align">' + comuna + ' <i class="fa fa-cutlery" aria-hidden="true"></i></div>' +
							            	'</div>' +
							          	'</div>' +
							        '</div>');

					$('.elegir').append('<option value="'+ city +'" id="'+cityId+'">'+ city +'</option>');

					var map = {};
					$('.elegir option').each(function () {
					    if (map[this.value]) {
					        $(this).remove()
					    }
					    map[this.value] = true;
					})

					$('.lista').append(estructura);

					$('#'+ elId).click(function() {
						$('.end').show();
						$('.end').empty();
						$('.end').append('<div class=" center end-nombre">'+
												'<div class="col s12">' + nombre +'<i class="fa fa-heart" aria-hidden="true"></i></div>'+
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
							$('.lista2').append(estructura);
						}

						$('#'+ elId).click(function() {
							$('.end').show();
							$('.end').empty();
							$('.end').append('<div class="row center end-nombre">'+
												'<div class="col s12">' + nombre +'</div>'+
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

					
			    });
			})
			.fail(function() {
				console.log("error");
			})
			
		});
// FIN FUNCIONES SEARCH
});

    /*validación de formulario SIGN UP*/
    var correo = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var password = /^[0-9]+(\.[0-9])?$/;


    $("#btn-crear").click(function(){
        var nombre = $("#name").val();        
        var email = $("#email").val();
        var contrasena = $("#password").val();
        
        if(nombre == ""){   
            $("#name_message").show();           
                //return false;
            }else{
                $("#name_message").hide();
                localStorage.setItem('Name', nombre);
            //var nombreSignUp = localStorage.getItem('Name'); 
			//alert(nombreSignUp);
        }

        if(email == "" || !correo.test(email)){
            $("#mail_message").show();
            //return false;
        }else{
            $("#mail_message").hide();
            localStorage.setItem('E-mail', email);
        }

        if(contrasena == "" || !password.test(contrasena)){
            $("#password_message").show();
            return false;
        }else{
            $("#password_message").hide();
            localStorage.setItem('Password', contrasena);
        }
        return true; 

        nombre = $("#name").val(" ");  //esto para limpiar los datos una vez puestos 
        email = $("#email").val(" ");
        contrasena = $("#password").val(" "); 
    });  

    var nombreSignUp = localStorage.getItem('Name'); 
    var emailSignUp = localStorage.getItem('E-mail'); 
    var contrasenaSignUp = localStorage.getItem('Password'); 
    $("#name-profile-data").html(nombreSignUp);
    $("#email-profile-data").html(emailSignUp);


    /*Validación de LOGIN*/
    $("#btn-login").click(function(){         
         var mailLogin = $("#mail_login").val();
         var passLogin = $("#password_login").val();

         if (mailLogin != emailSignUp) {
            $("#mail_error").show();
         }
         if(passLogin != contrasenaSignUp){
            $("#password_error").show();
        }else{
            window.open('search.html','_self');
        }
        
    });
//});//


    /*SECCION CARGANDO IMAGEN PERFIL - tiene q estar fuera para q no se vaya todo al carajillo*/
    function subirImagen(){
    	 $('#image-user').attr('src', localStorage.fileImage); //mostrara siempre la imagen guardada al cargar el documento

		function readURL(input) { //Pasa como parametro el input
	        if (input.files[0] != undefined) {  //Si el input no esta vacío
	            var reader = new FileReader(); // es una funcion predefinida de javascript permite que las aplicaciones web lean ficheros (o información en buffer) almacenados en el cliente, usando los objetos File o Blob.
	            
	            reader.onload = function (e) { //cuando termine de cargar en new FileReader
	            	//console.log(e);  //Es el objeto completo de la imagen
	            	//console.log(e.target.result); //Es la url de la imagen
	            	localStorage.fileImage =  e.target.result; //Es la direccion donde esta almacenada la imagen del lado de usuario
	                $('#image-user').attr('src', localStorage.fileImage);
	            }
	            reader.readAsDataURL(input.files[0]); //usado para leer el contenido del especificado Blob o File(Blob representa un objeto tipo fichero de datos como los de las imagenes).
	        }
	        else{
	        	$('#image-user').attr('src', 'http://www.lumineers.me/images/core/profile-image-zabadnesterling.gif');
	        }
	    }
	    
	    $("#imgInp").change(function(){ // cuando el input cambie llamara a la funcion readUrl
	        readURL(this); 
	    });
	}subirImagen()


