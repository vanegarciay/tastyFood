$(document).ready(function() {  //inicializar navbar de materialize
    $(".button-collapse").sideNav();

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

});


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
                $('#image-user').attr('src', 'http://s3.amazonaws.com/cdn.roosterteeth.com/default/md/user_profile_female.jpg');
            }
        }
        
        $("#imgInp").change(function(){ // cuando el input cambie llamara a la funcion readUrl
            readURL(this); 
        });
    }subirImagen()


