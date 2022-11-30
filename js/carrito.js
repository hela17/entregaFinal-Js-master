// go trough local storage

let carrito = [];
for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    let valor = JSON.parse(localStorage.getItem(clave));
    carrito.push({
        
        id: valor.id,
        titulo: valor.titulo,
        imagen: valor.imagen,
        precio: valor.precio,
        cantidad: valor.cantidad
    })
}


const verCarrito = document.getElementById("contenedor-carrito")

// if carrito is empty, show a message
if (carrito.length === 0) {
    let mensaje = document.createElement("p")
    mensaje.innerText = "No hay productos en el carrito"
    verCarrito.append(mensaje)
}



/* carrito.forEach((producto)=>{

    let product = JSON.parse(localStorage.getItem(producto.id));
    console.log(product)

    const div = document.createElement("div");
    div.classList.add("producto");
    
    let contenedor = document.createElement("div")
    contenedor.className = "producto-detalles"
    contenedor.innerHTML = `
    <h3>${producto.titulo}</h3>
    <p>${producto.precio}</p>
    `;

    contenedorProductosId.append(contenedor)

    let remover = document.createElement("button")
    remover.innerText = "Remover del carrito"
    remover.className = "producto-agregar"

    contenedor.append(remover)

}) */

carrito.forEach((producto)=>{

    const div = document.createElement("div");
    div.classList.add("carrito-productos");
    
    let contenedor = document.createElement("div")
    contenedor.className = "carrito-producto"
    contenedor.innerHTML = `
    <img class="carrito-producto-imagen" src="${producto.imagen}" alt="">
    <div class="carrito-producto-titulo">
        <small>Titulo</small>
        <h3>${producto.titulo}</h3>
    </div>
    <div class="carrito-producto-cantidad">
        <small>Cantidad</small>
        <p><button id="plusitem"> + </button> ${producto.cantidad} <button id="minusitem"> - </button></p>
    </div>
    <div class="carrito-producto-precio">
        <small>Precio</small>
        <p>${producto.precio}</p>
    </div>
    <div class="carrito-producto-subtotal">
        <small>Subtotal</small>
        <p>${producto.precio * producto.cantidad}</p>	
            </p>
    </div>
    
    `

    // get the buttons
    let plus = contenedor.querySelector("#plusitem")
    let minus = contenedor.querySelector("#minusitem")
    // add event listeners
    plus.addEventListener("click", () => {
        producto.cantidad += 1
        localStorage.setItem(producto.id, JSON.stringify(producto));
        console.log(producto.cantidad)
      location.reload()
    })
    minus.addEventListener("click", () => {
        // subtract 1 from the quantity
        producto.cantidad -= 1
        console.log(producto.cantidad)
        // if the quantity is 0, remove the item from the cart
        if (producto.cantidad === 0) {
            console.log("estamos en 0")
            localStorage.removeItem(producto.id)
           window.location.href = "carrito.html"
        } else {
            localStorage.setItem(producto.id, JSON.stringify(producto));
            location.reload();
        }

    })

    let remover = document.createElement("button")
    remover.innerHTML = `<i class="bi bi-trash-fill"></i>`
    remover.className = "carrito-producto-eliminar"
    contenedor.append(remover)
    remover.addEventListener("click", () => {
        console.log("removiendo")
        // remove from carrito array the item with the same name
        // remove from local storage the item with the same name

        localStorage.removeItem(producto.id)

/*         carrito.push(
            {
            id: producto.id,
            titulo: producto.titulo,
            precio: producto.precio,
            cantidad: 1
            }
        )
        guardarLocal(producto.id, JSON.stringify(producto));

        /* localStorage.setItem(producto.titulo,producto.precio); */


        

            // redirect to carrito
            window.location.href = "carrito.html"
        })
/*     contenedor.innerHTML = `
    <img class="producto-imagen" width="100px" src="${producto.imagen}" alt="${producto.titulo}">
    <h3>${producto.titulo}</h3>
    <p>${producto.precio}</p>
    `; */

    verCarrito.append(contenedor)
})

// get the total price
let total = 0
carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad
}
)
// show the total price
let totalContenedor = document.createElement("div")
totalContenedor.className = "carrito-total"
totalContenedor.innerHTML = `
    <h3>Total</h3>
    <p>${total}</p>
    `
verCarrito.append(totalContenedor)
