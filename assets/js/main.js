$(document).ready(function() {
  $(".button-collapse").sideNav();


/*SECCION CARGANDO IMAGEN PERFIL*/
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
});