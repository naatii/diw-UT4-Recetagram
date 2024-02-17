function lanzarParticulas(postIndex) {
    const particlesContainer = document.getElementById('particles');
    const numParticles = 20;
  
    const tenedorIcon = document.getElementById(`tenedor${postIndex}`);
  
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.top = `${window.scrollY + 10 + (Math.random() * 20 - 10)}px`; // Ajustar la posición según la ubicación del tenedor
      particle.style.left = `${window.scrollX + 10 + (Math.random() * 20 - 10)}px`;
    }  
  }