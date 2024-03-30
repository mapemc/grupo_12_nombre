
window.addEventListener("load", () => {

    let form = document.querySelector("#form");
    //console.log(form.username);
    
    let errorsHTML = document.querySelector(".errors");

    form.addEventListener("submit", (event) => {
        //console.log("se envió");
       

        let errorsList = [];

       
        ////email/////
        // Regex simple
        let reg1 = /\S+@\S+\.\S+/;
        
        if (form.email.value == "") {
            errorsList.push("Debes escribir un email");
        } else if (!reg1.test(form.email.value)) {
            errorsList.push("El email debe tener un formato válido");
        }

        const emailInput = document.querySelector('#email');
        const emailError = document.querySelector('.email-error');

        emailInput.addEventListener('blur', () => {
        const email = emailInput.value;

                        // Realizar una solicitud AJAX al servidor para verificar si el correo electrónico ya existe
                        /* fetch(`/check-email?email=${email}`)
                            .then((response) => response.json())
                            .then((data) => {
                            if (data.exists) {
                                emailError.textContent = 'El correo electrónico ya está registrado';
                            } else {
                                emailError.textContent = '';
                            }
                            })
                            .catch((error) => {
                            console.error('Error al verificar el correo electrónico:', error);
                            emailError.textContent = 'Error al verificar el correo electrónico';
                            });
                        }); */



        ////contrasenia///////
        //let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
        if (form.password.value == "") {
            errorsList.push("La contraseña no debe estar vacia");
        } /* else if (!passwordPattern.test(form.password.value)) {
            errorsList.push("La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial");
        } */

        //const emailInput = document.querySelector('#email');
        const passwordInput = document.querySelector('#password');
        const passwordError = document.querySelector('.password-error');

        emailInput.addEventListener('blur', () => {
        const email = emailInput.value;

        // Realizar una solicitud AJAX al servidor para obtener la contraseña almacenada en la base de datos
        fetch(`/get-password?email=${email}`)
            .then((response) => response.json())
            .then((data) => {
            if (data.password) {
                // Verificar la contraseña proporcionada por el usuario
                if (passwordInput.value === data.password) {
                passwordError.textContent = '';
                } else {
                passwordError.textContent = 'La contraseña no es válida';
                }
            } else {
                passwordError.textContent = 'El correo electrónico no existe';
            }
            })
            .catch((error) => {
            console.error('Error al obtener la contraseña:', error);
            passwordError.textContent = 'Error al verificar la contraseña';
            });
        });


        // Si el array no está vacio, tenemos errores
        if (errorsList.length > 0) {
            event.preventDefault();
            errorsHTML.innerHTML = "";
            errorsList.forEach(error => {
                errorsHTML.innerHTML += "<li>" + error + "</li>"
            })
        }
        console.log("Se envia el formulario!");

    })
})
})
