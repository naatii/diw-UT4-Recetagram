document.addEventListener("DOMContentLoaded", function () {
    const toggleMenuButton = document.getElementById("toggleMenuButton");
    const menuLateral = document.getElementById("aside");

  
    // Agregar un controlador de eventos al botón
    toggleMenuButton.addEventListener("click", function () {
      // Alternar la visibilidad del menú lateral
      menuLateral.classList.toggle("oculto");
    });
  });