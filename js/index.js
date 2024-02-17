import { post } from './posts.js'
let contador = 0;
let liked = false;

// Objeto para almacenar contadores individuales de tenedores
const contadores = {};

function toggleLike(postIndex) {
  const tenedorIcon = document.getElementById(`tenedor${postIndex}`);

  // Obtener el valor actual de 'liked' desde el atributo 'data-liked'
  let liked = tenedorIcon.dataset.liked === 'true';

  // Obtener el contador específico de esta publicación
  const contador = contadores[postIndex] || 0;

  if (liked) {
    // Disminuir el contador si ya fue clicado antes
    contadores[postIndex] = contador - 1;
  } else {
    // Incrementar el contador si es la primera vez que se clicó o si se deshizo un clic anterior
    contadores[postIndex] = contador + 1;
  }

  // Cambiar el estado 'liked'
  liked = !liked;

  // Actualizar el valor de 'liked' en el atributo 'data-liked'
  tenedorIcon.dataset.liked = liked;

  if (tenedorIcon) {
    const rect = tenedorIcon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 + window.scrollX;
    const centerY = rect.top + rect.height / 2 + window.scrollY;

    const numParticles = 20;

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.style.zIndex = '1';
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

    // Actualizar el contador específico de esta publicación en el HTML
    document.getElementById(`numeroTenedor${postIndex}`).textContent = contadores[postIndex];

    // Cambiar las clases del icono del tenedor según el estado 'liked'
    tenedorIcon.classList.toggle('fas', liked);
    tenedorIcon.classList.toggle('far', !liked);
  }
}

function compartirPost(postIndex) {
  const postId = `post-${postIndex}`;
  const enlaceUnico = window.location.href.split('#')[0] + `#${postId}`;

  if (navigator.share) {
    navigator.share({
      title: 'Recetagram',
      text: '¡Mira este increíble plato de Recetagram!',
      url: enlaceUnico
    })
  } else {
    alert('La funcionalidad de compartir no está disponible en este navegador.');
  }
}

function crearPublicacion(username, ingredientes, imagenSrc, descripcion, fotoUsuarioPerfil, postIndex) {
  const section = document.getElementById('publicaciones');

  const article = document.createElement('article');
  article.id = `post-${postIndex}`
  article.classList.add("article")
  const span = document.createElement('div');
  span.style.display = 'flex';
  span.style.gap = '10px';

  const nombreUsuario = document.createElement('p');
  nombreUsuario.textContent = username;
  nombreUsuario.id = username

  const fotoPerfil = document.createElement('img');
  fotoPerfil.src = fotoUsuarioPerfil;
  fotoPerfil.alt = 'Imagen de usuario';
  fotoPerfil.style.width = '55px';
  fotoPerfil.style.borderRadius = '100%';
  fotoPerfil.style.marginBottom = '10px';

  fotoPerfil.style.float = 'left';

  span.appendChild(fotoPerfil);
  span.appendChild(nombreUsuario);

  const contenedorIngredientes = document.createElement('div');
  const textoIgredientes = document.createElement('span');
  textoIgredientes.textContent = "Ingredientes: "
  textoIgredientes.appendChild(contenedorIngredientes);

  ingredientes.forEach(ingrediente => {
    const etiquetaIgrediente = document.createElement('button');
    etiquetaIgrediente.style.margin = '2px';
    etiquetaIgrediente.style.textTransform = 'capitalize';
    etiquetaIgrediente.style.fontWeight = 'bold';
    etiquetaIgrediente.textContent = `${ingrediente.nombre} (${ingrediente.cantidad})`;

    contenedorIngredientes.appendChild(etiquetaIgrediente);
  });

  const img = document.createElement('img');
  img.src = imagenSrc;
  img.id = `img-${postIndex}`;
  img.alt = 'Imagen de la receta';
  img.style.maxWidth = '300px';
  img.style.maxHeight = '300px';
  img.style.cursor = 'pointer';
  img.addEventListener("click", () => {
    post(`post-${postIndex}`)
})

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
  compartir.id = `compartir${postIndex}`;
  compartir.addEventListener("click", () => compartirPost(postIndex));
  compartir.style.cursor = 'pointer';
  compartir.className = "fa-solid fa-share";

  iconos.appendChild(tenedor);
  iconos.appendChild(numeroTenedor);
  iconos.appendChild(comentario);
  iconos.appendChild(numeroComentario);
  iconos.appendChild(compartir);

  const p = document.createElement('p');
  p.textContent = descripcion;
  p.id = `descripcionPost${postIndex}`;
  p.style.fontWeight = "100";

  article.appendChild(span);
  article.appendChild(img);
  article.appendChild(iconos);
  article.appendChild(contenedorIngredientes);

  article.appendChild(p);

  section.appendChild(article);
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

const ingredientes = [
  { nombre: 'queso', cantidad: ' 100g ' },
  { nombre: 'tomate', cantidad: ' 2 unidades ' },
  { nombre: 'arroz', cantidad: ' 250g ' },

 
  // Otros ingredientes...
];
// Mostrar publicaciones al cargar la página
Promise.all([obtenerUsuarios(), obtenerFotosPerfil()])
  .then(([usuarios, fotosPerfil]) => {
    const publicaciones = usuarios.map((usuario, index) => {
      const fotoPerfil = fotosPerfil[index].thumbnailUrl;
      crearPublicacion(usuario.name, ingredientes, 'https://via.placeholder.com/300x300', `Descripción corta de la receta ${index}. #Deliciosa #Cocina`, fotoPerfil, index);

    });
  });

 




