// Funcionalidad para los formularios con Formspree
document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los formularios que usarán Formspree
    const forms = document.querySelectorAll('form[action^="https://formspree.io"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Mostrar estado de carga en el botón
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.classList.add('btn-loading');
            submitButton.textContent = 'Enviando...';
            
            // Recopilar los datos del formulario
            const formData = new FormData(form);
            
            // Enviar los datos a Formspree
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error en el envío del formulario');
            })
            .then(data => {
                // Mostrar mensaje de éxito
                form.reset();
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto con usted a la brevedad.';
                form.parentNode.insertBefore(successMessage, form.nextSibling);
                
                // Eliminar mensaje después de 5 segundos
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 5000);
                
                // Restaurar el botón
                submitButton.classList.remove('btn-loading');
                submitButton.textContent = originalButtonText;
            })
            .catch(error => {
                // Mostrar mensaje de error
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-error-message';
                errorMessage.textContent = 'Ha ocurrido un error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.';
                form.parentNode.insertBefore(errorMessage, form.nextSibling);
                
                // Eliminar mensaje después de 5 segundos
                setTimeout(() => {
                    errorMessage.style.opacity = '0';
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 300);
                }, 5000);
                
                // Restaurar el botón
                submitButton.classList.remove('btn-loading');
                submitButton.textContent = originalButtonText;
                
                console.error('Error al enviar el formulario:', error);
            });
        });
    });
    
    // Validación de formularios
    const validateForms = document.querySelectorAll('.validate-form');
    
    validateForms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Validar al perder el foco
            input.addEventListener('blur', function() {
                validateInput(input);
            });
            
            // Validar al cambiar (para selects)
            input.addEventListener('change', function() {
                validateInput(input);
            });
            
            // Validar al escribir (después de un error)
            input.addEventListener('input', function() {
                if (input.classList.contains('is-invalid')) {
                    validateInput(input);
                }
            });
        });
        
        // Validar todo el formulario al enviar
        form.addEventListener('submit', function(event) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                event.preventDefault();
            }
        });
    });
    
    // Función para validar un campo
    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Eliminar mensajes de error anteriores
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Validar según el tipo de campo
        if (input.hasAttribute('required') && value === '') {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        } else if (input.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingrese un correo electrónico válido';
            }
        } else if (input.type === 'tel' && value !== '') {
            const phoneRegex = /^\+?[0-9\s\-\(\)]{7,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingrese un número de teléfono válido';
            }
        }
        
        // Mostrar error o éxito
        if (!isValid) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            
            // Crear mensaje de error
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            input.parentNode.appendChild(errorElement);
        } else {
            input.classList.remove('is-invalid');
            if (value !== '') {
                input.classList.add('is-valid');
            } else {
                input.classList.remove('is-valid');
            }
        }
        
        return isValid;
    }
});
