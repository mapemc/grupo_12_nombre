const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

//console.log(formulario);
//console.log(inputs);

const expresiones = {
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}


const campos = {
	username: false,
	email: false,
	password: false,
	confirmPassword: false,
}

const validarFormulario = (e) =>{
    console.log(e);
    switch (e.target.name) {
        case "username":
            if (e.target.value == "") {
                document.getElementById("inputboxesUsuario").classList.add('inputboxes__incorrecto')
                document.getElementById("inputboxesUsuario").classList.remove('inputboxes__correcto')
                document.querySelector("#inputboxesUsuario .aviso1").classList.add('aviso1-activo')
                campos[username] = false;

            } else if (e.target.value.length < 4 || e.target.value.length > 16) {
                document.getElementById("inputboxesUsuario").classList.add('inputboxes__incorrecto')
                document.getElementById("inputboxesUsuario").classList.remove('inputboxes__correcto')
                document.querySelector("#inputboxesUsuario .aviso2").classList.add('aviso2-activo')
                campos[username] = false;

            } else {
                document.getElementById("inputboxesUsuario").classList.remove('inputboxes__incorrecto')
                document.getElementById("inputboxesUsuario").classList.remove('inputboxes__correcto')
                document.querySelector("#inputboxesUsuario .aviso1").classList.remove('aviso1-activo')
                document.querySelector("#inputboxesUsuario .aviso2").classList.remove('aviso2-activo')
                campos[username] = true;
              
            }
        break;
        case "email":
          
                
                if (e.target.value == "") {
                    document.getElementById("inputboxesemail").classList.add('inputboxes__incorrecto')
                    document.getElementById("inputboxesemail").classList.remove('inputboxes__correcto')
                    document.querySelector("#inputboxesemail .aviso1").classList.add('aviso1-activo')
                    campos[email] = false;

                } else if (!expresiones.email.test(e.target.value)) {
                    document.getElementById("inputboxesemail").classList.add('inputboxes__incorrecto');
                    document.getElementById("inputboxesemail").classList.remove('inputboxes__correcto');
                    document.querySelector("#inputboxesemail .aviso2").classList.add('aviso2-activo');
                    campos[email] = false;
                } else{
                    document.getElementById("inputboxesemail").classList.remove('inputboxes__incorrecto')
                    document.getElementById("inputboxesemail").classList.remove('inputboxes__correcto')
                    document.querySelector("#inputboxesemail .aviso1").classList.remove('aviso1-activo')
                    document.querySelector("#inputboxesemail .aviso2").classList.remove('aviso2-activo')
                    campos[email] = true;
                }          
                
        break;

        case "password":
           
                if (e.target.value == "") {
                    document.getElementById("inputboxespassword").classList.add('inputboxes__incorrecto')
                    document.getElementById("inputboxespassword").classList.remove('inputboxes__correcto')
                    document.querySelector("#inputboxespassword .aviso1").classList.add('aviso1-activo')
                    campos[password] = false;

                 } else if (!expresiones.password.test(e.target.value)) {
                    document.getElementById("inputboxespassword").classList.add('inputboxes__incorrecto');
                    document.getElementById("inputboxespassword").classList.remove('inputboxes__correcto');
                    document.querySelector("#inputboxespassword .aviso2").classList.add('aviso2-activo');
                    campos[password] = false;

                } else{
                    document.getElementById("inputboxespassword").classList.remove('inputboxes__incorrecto')
                    document.getElementById("inputboxespassword").classList.remove('inputboxes__correcto')
                    document.querySelector("#inputboxespassword .aviso1").classList.remove('aviso1-activo')
                    document.querySelector("#inputboxespassword .aviso2").classList.remove('aviso2-activo')
                    campos[password] = true;
                }     
        break;
        case "confirmPassword":

                const inputPassword1 = document.getElementById('password');
	            const inputPassword2 = document.getElementById('confirmPassword');

	            if(inputPassword1.value !== inputPassword2.value){
                    document.getElementById("inputboxespassword2").classList.add('inputboxes__incorrecto')
                    document.getElementById("inputboxespassword2").classList.remove('inputboxes__correcto')
                    document.querySelector("#inputboxespassword2 .aviso1").classList.add('aviso1-activo')
                    campos[confirmPassword] = false;
                
	            } else {
		            document.getElementById("inputboxespassword2").classList.remove('inputboxes__incorrecto')
                    document.getElementById("inputboxespassword2").classList.remove('inputboxes__correcto')
                    document.querySelector("#inputboxespassword2 .aviso1").classList.remove('aviso1-activo')
                    campos[confirmPassword] = true;
	            }
        break;
        }
    }



        inputs.forEach((input) => {
        input.addEventListener('keyup', (e) => validarFormulario(e)); 
        input.addEventListener('blur', (e) => validarFormulario(e)); 
});


formulario.addEventListener('submit', (e)=>{
    //e.preventDefault();

    if((campos.username && campos.email && campos.password && campos.confirmPassword) === true) {
        document.getElementById('mensajeExito').classList.add('mensajeExito-activo');
    }
})
