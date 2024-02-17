document.addEventListener("DOMContentLoaded", function () {
    const scrollLeftButton = document.getElementById("scrollLeftButton");
    const scrollRightButton = document.getElementById("scrollRightButton");
    const mainContainer = document.getElementById("main");
  
    scrollLeftButton.addEventListener("click", function () {
      // Desplazar hacia la izquierda
      mainContainer.scrollLeft -= 1060; // Puedes ajustar la cantidad de desplazamiento según tus necesidades
    });
  
    scrollRightButton.addEventListener("click", function () {
      // Desplazar hacia la derecha
      mainContainer.scrollLeft += 1060; // Puedes ajustar la cantidad de desplazamiento según tus necesidades
    });
  });