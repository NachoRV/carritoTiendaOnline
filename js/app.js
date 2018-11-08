/**
 * 
 *  Variables:
 *  Capturamso el div con id carrito y el div con id lista-cursos
 * 
 *  */
 const carrito = document.getElementById('carrito');
 const listaCursos = document.getElementById('lista-cursos');
 const listaCursosCarrito = document.querySelector('#lista-carrito tbody');
 const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

/**
 * 
 *  Listener
 * 
 *  */
cargatEventListeners();

function cargatEventListeners(){
    // se dispara al presionar agregar carrito

    listaCursos.addEventListener('click', comprarCurso);
    // cuando se elimina un curso del carrito 
    carrito.addEventListener('click', eliminarCurso);
    // al vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    // al cargar elemento mostrar localStorage
    document.addEventListener('DOMContentLoaded', leerLocaStorage)
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
            <img src="${ curso.imagen }" width=100>
        </td>
        <td>${ curso.titulo }</td>
        <td>${ curso.precio }</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;

    listaCursosCarrito.appendChild(row);
    guardarCusoLocalStorage(curso);

}
// elimina el curso del carrito en el dom
function eliminarCurso(e){
    e.preventDefault();
    let curso,
        cursoId;
  
    if (e.target.classList.contains('borrar-curso')){

        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }

    eliminarCursoLocalStorage(cursoId);

}

function vaciarCarrito() {

    while(listaCursosCarrito.firstChild){

        listaCursosCarrito.removeChild(listaCursosCarrito.firstChild);
    }
    // Vaciar local Storage
    vaciarLocalStorage();
    return false;
}

// guarda curso en localStorage
function guardarCusoLocalStorage(curso){
    let cursos;
    cursos = obtenerCursosLocalStorage();

    cursos.push(curso)
    localStorage.setItem('cursos', JSON.stringify(cursos))
}

function obtenerCursosLocalStorage(){
    let cursosLs;
    // obtener cursos local Storege
    if(localStorage.getItem('cursos') === null){
        cursosLs = [];
    }else {
        cursosLs = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLs;
}
// imprime los cursos de local Storage en el carrito

function leerLocaStorage(){
    let cursosLs;
    cursosLs= obtenerCursosLocalStorage();

    cursosLs.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${ curso.imagen }" width=100>
            </td>
            <td>${ curso.titulo }</td>
            <td>${ curso.precio }</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
    
        listaCursosCarrito.appendChild(row);
        
    });
}
// eliminar curso de loca Storage
function eliminarCursoLocalStorage(cursoId){
    let cursosLs;
    cursosLs = obtenerCursosLocalStorage();

    cursosLs.forEach( (curso, index) =>{

        if(curso.id === cursoId){
            
            cursosLs.splice(index, 1);
           
        }
    })

    localStorage.setItem('cursos', JSON.stringify(cursosLs));

}
// vaciar local storage
function vaciarLocalStorage() {

    localStorage.clear();
    
}