document.addEventListener('DOMContentLoaded', function(){   //empieza a escuchar apenas se carga el documento
    
    const loginForm = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const showHideButton = document.getElementById('show-hide');


    loginForm.addEventListener('submit', function(event){   
        event.preventDefault();
        validateForm();
        })

        email.addEventListener('blur', function(){   //blur, es una accion cuando salimos del formulario
            validateEmail();
        })

        email.addEventListener('change', function(){
            clearError(emailError);
            
        })

        password.addEventListener('change', function(){
            clearError(passwordError);

        })
        confirmPassword.addEventListener('change', function(){
            clearError(confirmPasswordError);
        })

        function validateForm(){
            const isValidEmail = validateEmail();
            const isValidPassword = validatePassword();
            const matchPassword = validatePasswordMatch();
            if(isValidEmail && isValidPassword && matchPassword){
                //guardar mail en localstorage y generar json
                saveToLocalStorage();
                alert('Has ingresado exitosamente.');
            }
        }

        showHideButton.addEventListener('click', function(){
            if(password.type == 'password'){
                password.type = 'text';
                confirmPassword.type = 'text';
            }else{
                password.type = 'password';
                confirmPassword.type = 'password';
            }
        })

        function validateEmail(){

         const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         const emailValue = email.value.trim(); //el trim elimina espacios vacios al comienzo y final del input.

         if(!regex.test(emailValue)){
            showError(emailError, 'el correo no es valido');
            return false;
         }else{
            return true;
         }
                   
        }

        function validatePassword(){
            const passwordValue = password.value.trim();

            if(passwordValue.length < 6){
                showError(passwordError, 'la contraseña no es valida. Debe tener almenos 6 caracteres');
                return false;
            }else{
                return true
            }
        }

        function validatePasswordMatch(){
            const passwordValue = password.value.trim();
            const confirmPasswordValue = confirmPassword.value.trim();

            if(passwordValue != confirmPasswordValue){
                showError(confirmPasswordError, 'las contraseñas no coinciden');
                return false;
            }else{
                return true;
            }
        }

        function showError(errorElement, message){
            errorElement.innerHTML = message;
            errorElement.style.display = 'block';
        }

        function clearError(errorElement){
            errorElement.innerHTML = '';
            errorElement.style.display = 'none';
        }

        function saveToLocalStorage(){
            const emailValue = email.value.trim();
            localStorage.setItem('email', emailValue);
            const body = bodyBuilderJson();
            console.log(body)
        }

        function bodyBuilderJson(){
            return {
                "email": email.value,
                "password": password.value
            }
        }



})  