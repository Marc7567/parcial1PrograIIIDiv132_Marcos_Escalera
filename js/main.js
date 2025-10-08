/*
Ejercicio 1 _____________ 0.5 puntos
Crea un array de objetos con 13 frutas. Cada objeto debe tener las siguientes claves:
• id
• nombre
• precio
• ruta de la imagen (correspondiente a la carpeta img).
*/
const frutas =[
    {id: 1, nombre:"anana", precio: 1000, ruta_img:"img/anana.jpg"},
    {id: 2, nombre:"arandano", precio: 5000, ruta_img:"img/arandano.jpg"},
    {id: 3, nombre:"banana", precio: 2500, ruta_img:"img/banana.jpg"},
    {id: 4, nombre:"frambuesa", precio: 1500, ruta_img:"img/frambuesa.png"},
    {id: 5, nombre:"frutilla", precio: 2000, ruta_img:"img/frutilla.jpg"},
    {id: 6, nombre:"kiwi", precio: 3000, ruta_img:"img/kiwi.jpg"},
    {id: 7, nombre:"mandarina", precio: 800, ruta_img:"img/mandarina.jpg"},
    {id: 8, nombre:"manzana", precio: 1000, ruta_img:"img/manzana.jpg"},
    {id: 9, nombre:"naranja", precio: 3500, ruta_img:"img/naranja.jpg"},
    {id: 10, nombre:"pera", precio: 1000, ruta_img:"img/pera.jpg"},
    {id: 11, nombre:"pomelo-amarillo", precio: 2500, ruta_img:"img/pomelo-amarillo.jpg"},
    {id: 12, nombre:"pomelo-rojo", precio: 3500, ruta_img:"img/pomelo-rojo.jpg"},
    {id: 13, nombre:"sandia", precio: 4000, ruta_img:"img/sandia.jpg"}
];

/*
Ejercicio 2 _____________ 0.5 puntos
Modifica la función inicializadora  init()  para incluir una función que imprima tu nombre y apellido en el  <nav>  del HTML
y también en la consola.
Pasos:
• Crea un objeto alumno con tus datos (dni, nombre, apellido).
• Usa backticks (``) para mostrar en consola un mensaje que incluya estos datos desde el objeto.
• Imprimí tu nombre y apellido en el  <nav>  y en la consola.
• Todo esto debe ser parte de la funcion imprimirDatosAlumno()
*/

//variables contenedoras
let contenedorNom_ape = document.querySelector("#nombre-apellido");

let contenedorProductos = document.getElementById("contenedorProductos")

let buscarProductos = document.getElementById("barraBusqueda");

let contenedorCarrito = document.getElementById("contenedorCarrito");

let contenedorContadorProd = document.getElementById("contadorCarrito");

let contenedorTotalCarrito = document.getElementById("totalCarrito");

let BotonVaciarCarrito = document.getElementById("VaciarCarrito");

//creamos un objeto alumno
const alumno= {dni: 11122244 ,nombre: "Marcos" ,apellido: "Escalera"};

function imprimirDatosAlumno(alumno){
    console.log(`dni:${alumno.dni}, nombre:${alumno.nombre}, apellido:${alumno.apellido}`);

    contenedorNom_ape.innerHTML = `${alumno.nombre}-${alumno.apellido}`;
}

/*
Ejercicio 3 _____________ 1 punto
Implementa una función que imprima en pantalla los productos (frutas) del array de objetos. Agrega esta función dentro de
init() .

El HTML generado debe seguir esta estructura:
<div class="card-producto">
    <img src="" alt="">
    <h3></h3>
    <p>$</p>
    <button>Agregar al carrito</button>
</div>
*/
//creamos la funcion imprimirProductos() ademas de un contenedor
function imprimirProductos(productos){
    let cartaProductos = "";
    //usamos for each para recores el array de objetos
    productos.forEach(fruta => {
        cartaProductos += `
            <div class="card-producto">
                <img src="${fruta.ruta_img}" alt="${fruta.nombre}">
                <h3>${fruta.nombre}</h3>
                <p>$${fruta.precio}</p>
                <button onclick="agregarCarrito(${fruta.id})">Agregar al carrito</button>
            </div>`;
    contenedorProductos.innerHTML = cartaProductos;
    });
}

/*
Ejercicio 4 _____________ 1 punto
Implementar una función de filtro, que se dispare al escribir en un campo input, filtrando los productos que coincidan con el
campo de texto.
*/
//evento buscar producto en la barra de busqueda
buscarProductos.addEventListener("keyup", () => {
    filtrarProductos();
})

// funcion filtrarProductos()
function filtrarProductos(){
    //guardamos en una variable el valor de busqueda
    let valorBusqueda = buscarProductos.value;

    //busqueda si dicho producto existe
    let productosFiltrados = frutas.filter(fruta => fruta.nombre.includes(valorBusqueda));

    //mostramos los productos filtrados
    imprimirProductos(productosFiltrados);
}

/*
Ejercicio 5 _____________ 2 puntos
1. Implementar la funcionalidad de carrito, esta debe estar asociada al boton de cada elemento del carrito. El carrito debe
mostrarse por console.log()

2. Incorporar la funcion  mostrarCarrito()  asociada al boton de cada elemento del carrito El HTML generado debe
seguir esta estructura:
<li class="bloque-item">
    <p class="nombre-item">nombreProducto - precioProducto</p>
    <button class="boton-eliminar">Eliminar</button>
</li>

3. Incorporar la funcion  eliminarProducto() . Este debe estar asociado al boton del carrito
*/
//varible carrito
let carrito = [];

//funcion mostrarCarrito()
function mostrarCarrito(){
    let cartaCarrito = "<ul>";

    carrito.forEach((producto, indice) => {
        cartaCarrito += `
        <li class="bloque-item">
            <p class="nombre-item">${producto.nombre} - $${producto.precio}</p>
            <button class="boton-eliminar" onclick="eliminarProducto(${indice})">Eliminar</button>
        </li>`;
    })
    cartaCarrito += '</ul>';
    contenedorCarrito.innerHTML = cartaCarrito;
    
    console.log(carrito);
    
    contadorCarrito();
    totalCarrito();
}

//funcion agregar al carrito
function agregarCarrito(id){
    let frutaCarrito = frutas.find(producto => producto.id === id);
    
    //anadimos la fruta al carrito 
    carrito.push(frutaCarrito);
    //mostramos carrito
    console.log(carrito);
    mostrarCarrito();

    almacenarCarrito();
}

//funcion eliminarProducto() del carrito 
function eliminarProducto(index) {
    carrito.splice(index, 1); 
    mostrarCarrito(); 

    almacenarCarrito();
}

/*
Ejercicio 6 _____________ 1 punto
• Almacena los productos del carrito en localStorage .
• Los productos en el localStorage deben estar además con los últimos cambios de carrito y los productos que se hayan
eliminado del carrito
• Si existen productos previamente en el localStorage, deben poder verse cuando se cargue la pagina
*/
function almacenarCarrito(){
    let guardarCarrito = JSON.stringify(carrito);
    localStorage.setItem("carrito", guardarCarrito)
    
}

function cargarCarrito(){
    const carritoGuardado = localStorage.getItem("carrito");
    if(carritoGuardado){
        //existe un carrito almacenado
        // convertimos los datos 
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
}

/* 
Ejercicio 7 _____________ 1 punto
• Implementa un contador de números de productos del carrito. Si hay 0 productos se eliminan del carrito.
• Actualiza la cantidad de productos en el header en la parte de Carrito: 0 productos
• Actualiza el precio del valor total del carrito abajo de todo a la derecha (cuando haya productos en el carrito)
*/
function contadorCarrito(){
    contenedorContadorProd.innerHTML = `<p>Carrito: ${carrito.length} Productos</p>`;
}

function totalCarrito(){
    //sacamos el precio total de los productos que tengamos en el carrito
    let total = carrito.reduce((total, producto) => total + producto.precio, 0);
    contenedorTotalCarrito.innerHTML = `<p>Total: $${total}</p>`;
}

/*
Ejercicio 9 _____________ 0.5 puntos
• Implementa la funcionalidad para Vaciar carrito. Crea un botón en la sección carrito que vacíe todo el carrito.
*/
BotonVaciarCarrito.addEventListener("click", () =>{
    //vaciamos el carrito
    carrito = [];
    contenedorCarrito.innerHTML = "";
    //actualizamos el total y la cantidad de productos que tenemos
    totalCarrito();
    contadorCarrito();
    almacenarCarrito()
})

//funcion init
function init(){
    imprimirDatosAlumno(alumno);
    imprimirProductos(frutas);
    cargarCarrito();
}

init()