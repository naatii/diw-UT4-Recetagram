let contador = 0;
let liked = false;

function toggleLike(postIndex) {
    const tenedorIcon = document.getElementById(`tenedor${postIndex}`);
     
    if (liked) {
      contador--;
      liked = false;
    } else {
      contador++;
      liked = true;
    if (!tenedorIcon) {
    // No se pudo encontrar el icono del tenedor
    return;
    }

    const rect = tenedorIcon.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2 + window.scrollX;
    const centerY = rect.top + rect.height / 2 + window.scrollY;

    const numParticles = 20;

    for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.style.zIndex = '1'
    particle.classList.add('particle');

    const angle = Math.random() * 2 * Math.PI;
    const distance = 10 + Math.random() * 20;
    const particleX = centerX + distance * Math.cos(angle);
    const particleY = centerY + distance * Math.sin(angle);

    particle.style.top = `${particleY}px`;
    particle.style.left = `${particleX}px`;

    document.body.appendChild(particle);
    }

    setTimeout(() => {
    document.querySelectorAll('.particle').forEach(particle => particle.remove());
    }, 1000);
}
  
    document.getElementById(`numeroTenedor${postIndex}`).textContent = contador;
    tenedorIcon.classList.toggle('fas', liked);
    tenedorIcon.classList.toggle('far', !liked);
  }
  
  

function crearPublicacion(username, titulo, imagenSrc, descripcion, fotoUsuarioPerfil, postIndex) {
  const section = document.getElementById('publicaciones');
  const article = document.createElement('article');
  const span = document.createElement('div');
  span.style.display = 'flex';
  span.style.gap = '10px';

  const nombreUsuario = document.createElement('p');
  nombreUsuario.textContent = username;

  const fotoPerfil = document.createElement('img');
  fotoPerfil.src = fotoUsuarioPerfil;
  fotoPerfil.alt = 'Imagen de usuario';
  fotoPerfil.style.width = '20%';
  fotoPerfil.style.borderRadius = '100%';
  fotoPerfil.style.float = 'left';

  span.appendChild(fotoPerfil);
  span.appendChild(nombreUsuario);

  const tituloPost = document.createElement('h2');
  tituloPost.textContent = titulo;
  tituloPost.style.marginTop = '40px';

  const img = document.createElement('img');
  img.src = imagenSrc;
  img.alt = 'Imagen de la receta';

  const iconos = document.createElement('p');
  iconos.style.display = 'flex';
  iconos.style.gap = '10px';

  const tenedor = document.createElement('i');
  tenedor.id = `tenedor${postIndex}`;
  tenedor.style.zIndex = '2'
  tenedor.className = "fa-solid fa-utensils";
  tenedor.style.cursor = 'pointer';
  tenedor.addEventListener("click", () => toggleLike(postIndex));

  const numeroTenedor = document.createElement('span');
  numeroTenedor.id = `numeroTenedor${postIndex}`;
  numeroTenedor.textContent = 0;

  const comentario = document.createElement('i');
  comentario.className = "fa-solid fa-comments";
  comentario.style.zIndex = '2'
  const numeroComentario = document.createElement('span');
  numeroComentario.textContent = 0;

  const compartir = document.createElement('i');
  compartir.className = "fa-solid fa-share";

  iconos.appendChild(tenedor);
  iconos.appendChild(numeroTenedor);
  iconos.appendChild(comentario);
  iconos.appendChild(numeroComentario);
  iconos.appendChild(compartir);

  const p = document.createElement('p');
  p.textContent = descripcion;

  article.appendChild(span);
  article.appendChild(tituloPost);
  article.appendChild(img);
  article.appendChild(iconos);
  article.appendChild(p);

  section.appendChild(article);
}

function lanzarParticulas(postIndex) {
    const particlesContainer = document.getElementById('particles');
    const numParticles = 20;

    const tenedorIcon = document.getElementById(`tenedor${postIndex}`);
    const rect = tenedorIcon.getBoundingClientRect();

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.top = `${rect.top + window.scrollY + 10 + (Math.random() * 20 - 10)}px`; // Ajustar la posición según la ubicación del tenedor
      particle.style.left = `${rect.left + window.scrollX + 10 + (Math.random() * 20 - 10)}px`;

      particlesContainer.appendChild(particle);
    }

    setTimeout(() => {
      particlesContainer.innerHTML = '';
    }, 1000);
  }

function obtenerUsuarios() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .catch(err => mostrarError(err));
}

function obtenerFotosPerfil() {
  return fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json())
    .catch(err => mostrarError(err));
}

function mostrarError(err) {
  console.log(err);
}

Promise.all([obtenerUsuarios(), obtenerFotosPerfil()])
  .then(([usuarios, fotosPerfil]) => {
    usuarios.forEach((usuario, index) => {
      const fotoPerfil = fotosPerfil[index].thumbnailUrl;
      crearPublicacion(usuario.name, `receta ${index + 1}`, 'https://via.placeholder.com/250x250', `Descripción corta de la receta ${index + 1}. #Deliciosa #Cocina`, fotoPerfil, index);
    });
  });