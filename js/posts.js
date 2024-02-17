
export function post(fragmento){
    
    if (fragmento) {
        console.log("Fragmento presente:", fragmento);

        const articles = document.querySelectorAll("article");
        console.log(articles)
        // Iterar sobre cada artículo y ocultarlo
        articles.forEach(article => {
            article.style.display = "none";
        });

        const postId = `${fragmento}`;
        console.log("Post ID:", postId);

        const publicacion = document.getElementById(postId);

        // Mostrar solo la publicación deseada
        if (publicacion) {
            console.log("Publicación encontrada:", publicacion);

            publicacion.style.display = 'block';
        } else {
            console.log("Publicación no encontrada");
        }
    } else {
        console.log("Fragmento no presente");
    }
}
setTimeout(() => {
    console.log("DOMContentLoaded event fired");
    

    const fragmento = window.location.hash.substring(1);
    
    
   post(fragmento)
}, 1000);

