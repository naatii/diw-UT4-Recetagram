import { post } from './posts.js'
let contador = 0;
let liked = false;

function particules(tenedorIcon) {
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
}

// Objeto para almacenar contadores individuales de tenedores
/**
 * Esta función activa o desactiva el like según 
 * @param {postIndex} postIndex indica el número del post
 */



const likesData = {
  likeCounters: {},
  votedPosts: [],
};

// Recuperar datos al iniciar la aplicación
likesData.likeCounters = JSON.parse(localStorage.getItem('likeCounters')) || {};
likesData.votedPosts = JSON.parse(localStorage.getItem('votedPosts')) || [];

function toggleLike(postIndex) {
  const tenedorIcon = document.getElementById(`tenedor${postIndex}`);
  const numeroTenedorSpan = document.getElementById(`numeroTenedor${postIndex}`);

  const contador = likesData.likeCounters[postIndex] || 0;

  particules(tenedorIcon);

  // Verificar si el usuario ya ha votado esta publicación
  if (likesData.votedPosts.includes(postIndex)) {
    // El usuario ya votó, por lo que quiere deshacer el like

    // Disminuir el contador y cambiar el estado 'liked'
    likesData.likeCounters[postIndex] = contador - 1;
    tenedorIcon.dataset.liked = false;

    numeroTenedorSpan.textContent = likesData.likeCounters[postIndex];

    // Cambiar las clases del icono del tenedor según el estado 'liked'
    tenedorIcon.classList.add('far');
    tenedorIcon.classList.remove('fas');

    // Eliminar la marca de esta publicación como votada por el usuario
    likesData.votedPosts = likesData.votedPosts.filter((index) => index !== postIndex);

  } else {
    // El usuario no ha votado esta publicación, por lo que quiere dar like

    // Incrementar el contador y cambiar el estado 'liked'
    likesData.likeCounters[postIndex] = contador + 1;
    tenedorIcon.dataset.liked = true;

    // Actualizar el contenido del número de likes
    numeroTenedorSpan.textContent = likesData.likeCounters[postIndex];

    // Cambiar las clases del icono del tenedor según el estado 'liked'
    tenedorIcon.classList.add('fas');
    tenedorIcon.classList.remove('far');

    // Marcar esta publicación como votada por el usuario
    likesData.votedPosts.push(postIndex);
  }

  // Guardar los datos actualizados en el objeto JSON
  saveDataToJSON();
}

function saveDataToJSON() {
  // Guardar los datos actualizados en el objeto JSON
  // (esto debería realizarse siempre que haya cambios significativos en los datos)
  // Puedes ajustar esta función según tus necesidades específicas.
  console.log('Guardando datos en el objeto JSON:', likesData);
}
function cambiarMetaTags(title, description, image) {
  document.querySelector('meta[property="og:title"]').setAttribute('content', title);
  document.querySelector('meta[property="og:description"]').setAttribute('content', description);
  document.querySelector('meta[property="og:image"]').setAttribute('content', image);
}

// Llamada a la función con los valores deseados

function compartirPost(postIndex, imagenSrc) {
  const postId = `post-${postIndex}`;
  const enlaceUnico = window.location.href.split('#')[0] + `#${postId}`;

  if (navigator.share) {
    navigator.share({
      title: 'Recetagram',
      text: '¡Mira este increíble plato de Recetagram!',
      url: enlaceUnico,
    })
    document.addEventListener('DOMContentLoaded', function() {
      cambiarMetaTags(`Receta ${postIndex}`, "¡Mira este increíble plato de Recetagram!", imagenSrc);
    });
  } else {
    alert('La funcionalidad de compartir no está disponible en este navegador.');
  }
}

function crearPublicacion(username, ingredientes, imagenSrc, descripciones, fotoUsuarioPerfil, postIndex, etiquetas) {
  const section = document.getElementById('publicaciones');

  const article = document.createElement('article');
  article.id = `post-${postIndex}`
  article.classList.add("article")
  const span = document.createElement('div');
  span.style.display = 'flex';
  span.style.alignItems = 'center';
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
  tenedor.className = "fa-solid fa-utensils";
  tenedor.style.cursor = 'pointer';
  tenedor.addEventListener("click", () => toggleLike(postIndex));

  const numeroTenedor = document.createElement('span');
  numeroTenedor.id = `numeroTenedor${postIndex}`;
  numeroTenedor.textContent = likesData.likeCounters[postIndex] || 0;

  const comentario = document.createElement('i');
  comentario.className = "fa-solid fa-comments";
  const numeroComentario = document.createElement('span');
  numeroComentario.textContent = 0;

  const compartir = document.createElement('i');
  compartir.id = `compartir${postIndex}`;
  compartir.addEventListener("click", () => compartirPost(postIndex, imagenSrc));
  compartir.style.cursor = 'pointer';
  compartir.className = "fa-solid fa-share";

  iconos.appendChild(tenedor);
  iconos.appendChild(numeroTenedor);
  iconos.appendChild(comentario);
  iconos.appendChild(numeroComentario);
  iconos.appendChild(compartir);
  const contenedorPublicacion = document.createElement('div');
  const descripcionAleatoria = descripciones[Math.floor(Math.random() * descripciones.length)];

      // Crear un párrafo para la descripción
      const p = document.createElement('p');
      p.innerHTML = `<strong>@${descripcionAleatoria.usuario}</strong>: ${descripcionAleatoria.contenido} ${descripcionAleatoria.etiquetas.join(' ')}`;
      contenedorPublicacion.appendChild(p);


  // Agregamos el párrafo y el contenedor de etiquetas al DOM
  // Asumo que contenedorIngredientes es el elemento al que deseas agregar estos elementos.


  article.appendChild(span);
  article.appendChild(img);
  article.appendChild(iconos);
  article.appendChild(contenedorIngredientes);

  article.appendChild(contenedorPublicacion);

  section.appendChild(article);
}

function obtenerUsuarios() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .catch(err => mostrarError(err));
}
function obtenerFotos() {
  return fetch('https://picsum.photos/v2/list')
    .then(response => response.json())
    .catch(err => mostrarError(err));
}

function obtenerFotosPerfil(index) {
  return `https://xsgames.co/randomusers/assets/avatars/pixel/${index}.jpg`
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
const descripcion = [
  { prefijo: '#', etiqueta: 'delucioso' },
  { prefijo: '#', etiqueta: 'cocina' },
  { prefijo: '#', etiqueta: 'recetagram' },
  { prefijo: '@', etiqueta: 'recetagram' },
]
// Mostrar publicaciones al cargar la página
Promise.all([obtenerUsuarios(), obtenerFotosPerfil(), obtenerFotos()])
  .then(([usuarios, fotosPerfil, fotos]) => {
    const publicaciones = usuarios.map((usuario, index) => {
      const descripciones  = [
        { usuario: usuario.username, contenido: "Esta maravillosa receta ha sido creada con muy pocos ingredientes", etiquetas: ["#delicioso", "#cocina", "#recetagram", "@recetagram"] },
        { usuario: usuario.username, contenido: "Esta receta está creada al gusto del consumidor", etiquetas: ["#recetafacil", "#cocina", "#recetagram", "@recetagram"] },
        { usuario: usuario.username, contenido: "Receta ideal para una cena ideal", etiquetas: ["#cenaenpareja", "#cocina", "#recetagram", "@recetagram"] },
        { usuario: usuario.username, contenido: "Receta ideal para bodas con muchos comensales", etiquetas: ["#boda", "#cocina", "#recetagram", "@recetagram"] },
        { usuario: usuario.username, contenido: "Menú de catering para 200 comensales", etiquetas: ["#catering", "#cocina", "#recetagram", "@recetagram", "@cateringdcortes"] },
      ]
      const fotoPerfil = obtenerFotosPerfil(index);
      const foto = fotos[index];
      crearPublicacion(usuario.name, ingredientes, foto.download_url, descripciones , fotoPerfil, index);
    });
  });