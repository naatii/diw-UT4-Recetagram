// ejemplo
// fetch('http://192.168.1.147:3000/pedidos')
// .then(response => response.json())
// .then(data => mostrarDatos(data))
// .catch(err => mostrarError(err))

let username
let userPhoto

// URL de la API de JSONPlaceholder para obtener usuarios
const apiUrlUsuarios = 'https://jsonplaceholder.typicode.com/users';
const apiUrlFotoPerfil = 'https://jsonplaceholder.typicode.com/photos';
let dataUsuario
// Función para hacer la solicitud a la API
 
function obtenerUser(){
    fetch(apiUrlUsuarios
        )
    .then( response => response.json())
    .then( data => {
        username = data;
    })
    .catch( err => console.log(err))
}
function obtenerFotoPerfil(){
    fetch(apiUrlFotoPerfil
        )
    .then( response => response.json())
    .then( data => {
        userPhoto = data
    })
    .catch( err => console.log(err))
}

obtenerUser()
obtenerFotoPerfil()
setTimeout(() => {
    crearPost(username, userPhoto)
}, 1000);

// Llamada a la función para obtener los usuarios al cargar la página (puedes hacerlo en respuesta a un evento, etc.)
function crearPublicacion(username="", titulo="", imagenSrc ="", descripcion="", fotoUsuarioPerfil) {
    
    const section = document.getElementById('publicaciones');

    const article = document.createElement('article');

    

    const span = document.createElement('div');
    span.style.display = 'flex'
    span.style.gap = '10px'

    const nombreUsuario = document.createElement('p');
    nombreUsuario.textContent = username;

    const fotoPerfil = document.createElement('img');
    fotoPerfil.src = fotoUsuarioPerfil;
    fotoPerfil.alt = 'Imagen de usuario';
    fotoPerfil.style.width = '20%'
    fotoPerfil.style.borderRadius = '100%'
    fotoPerfil.style.float = 'left';

    span.appendChild(fotoPerfil);
    span.appendChild(nombreUsuario);

    const h2 = document.createElement('h2');
    h2.textContent = titulo;
    h2.style.marginTop = '40px'

    const img = document.createElement('img');
    img.src = imagenSrc;
    img.alt = 'Imagen de la receta';


    const p = document.createElement('p');
    p.textContent = descripcion;

    article.appendChild(span);
    article.appendChild(h2);
    article.appendChild(img);
    article.appendChild(p);

    section.appendChild(article);
  }
  console.log(dataUsuario);
function crearPost(username, userPhoto){
    for (let i = 1; i <= 5; i++) {
        crearPublicacion(`${username[i].name}`, `receta ${i}`, 'https://via.placeholder.com/250x250', `Descripción corta de la receta ${i}. #Deliciosa #Cocina`, `${userPhoto[i].thumbnailUrl}` );
      }    
}

  
function mostrarError(err){
    console.log(err);
}


crearPost()