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
