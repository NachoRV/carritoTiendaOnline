/**
 * 
 *  Variables:
 *  Capturamso el div con id carrito y el div con id lista-cursos
 * 
 *  */
 const carrito = document.getElementById('carrito');
 const listaCursos = document.getElementById('lista-cursos');
 const listaCursosCarrito = document.querySelector('#lista-carrito tbody');

/**
 * 
 *  Listener
 * 
 *  */
cargatEventListeners();

function cargatEventListeners(){
    // se dispara al presionar agregar carrito

    listaCursos.addEventListener('click', comprarCurso);

}

/***
 * 
 *  Funciones
 * 
 *  */ 
// función para añadir el curso al carrito
 function comprarCurso(e){
    e.preventDefault();
    // delegation para agregar carrito
    if(e.target.classList.contains('agregar-carrito')){

        const curso = e.target.parentElement.parentElement;

        // enviamos el curso para leer los datos
        leerDatosCurso(curso);
    }
    
 }
 // funcion para leer los datos del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')

    }

    insertarCarrito(infoCurso);

}

// Muestra el curso insertado en el carrito

function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${ curso.imagen }">
        </td>
        <td>${ curso.titulo }</td>
        <td>${ curso.precio }</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;

    listaCursosCarrito.appendChild(row);

}