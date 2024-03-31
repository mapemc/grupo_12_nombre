// Espera a que el documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Obtiene el botón por su ID
    var editProductButton = document.querySelector('#editProductButton');

    // Agrega un evento de clic al botón
    editProductButton.addEventListener('click', function() {
        // Usa smooth scrolling para ir al principio de la página
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Scroll suave
        });
    });

});
