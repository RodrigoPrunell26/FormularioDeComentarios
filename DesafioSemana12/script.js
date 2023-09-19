document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("comment-form");
    const comentariosContainer = document.getElementById("comments-container");

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const comentario = document.getElementById("comment").value;
        const nombre = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const puntuacion = document.getElementById("rating").value;

        if (comentario.trim() === "") {
            alert("Debes escribir un comentario");
            return;
        }

        // Usar Math.floor() para redondear el valor de la puntuacion de las estrellas con el valor que se trae de rating
        const puntuacionRedondeada = Math.floor(puntuacion);

        const estrellas = '<span class="fa fa-star checked"></span>'.repeat(puntuacionRedondeada);

        const comentarioHTML = `
            <div class="comentarios">
                <div class="estrellas">${estrellas}</div>
                <p>NOMBRE: ${nombre}</p>
                <p>EMAIL: ${email}</p>
                <p>${comentario}</p>
            </div>
        `;
        //AGREGAMOS AL FINAL DEL ELEMENTO LOS COMENTARIOS AGREGADOS SIN REMPLAZAR LOS ANTERIORES COMENTARIOS.
        comentariosContainer.insertAdjacentHTML("beforeend", comentarioHTML);
        //DEJAMOS EL FORMULARIO DE AGREGAR COMENTARIO VACIO LUEGO, PARA PODER AGREGAR MAS.
        formulario.reset();
    });

    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(data => {
            const comentarios = data.slice(-10);

            comentarios.forEach(comment => {
                const puntuacion = Math.floor(Math.random() * 5) + 1; 
                const estrellas = '<span class="fa fa-star checked"></span>'.repeat(puntuacion);

                const comentarioHTML = `
                    <div class="comentarios">
                        <div class="estrellas">${estrellas}</div>
                        <p>NOMBRE: ${comment.name}</p>
                        <p>EMAIL: ${comment.email}</p>
                        <p>${comment.body}</p>
                    </div>
                `;

                comentariosContainer.insertAdjacentHTML("beforeend", comentarioHTML);
            });
        });
});
