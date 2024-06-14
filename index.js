  let productos = [
{id:1,nombre:"got", precio:1000, img:"img/gow.jpeg" },
{id:2,nombre:"cod", precio:1200, img:"img/cod.jpg"},
{id:3,nombre:"gta", precio:1300, img:"img/gta2.jpg"},
{id:4,nombre:"fifa", precio:1400, img:"img/fifa.jpg"},
{id:5,nombre:"mk11", precio:1500, img:"img/mk2.jpg"},
{id:6,nombre:"The Last Of Us", precio:1600, img:"img/theLastOfUs.jpg"},
{id:7,nombre:"Uncharted", precio:1700, img:"img/uncharted.jpeg"},
{id:8,nombre:"Until Dawn", precio:1800, img:"img/untilDawn.jpg"}
];
localStorage.setItem("productos",JSON.stringify(productos))


let recuperado = JSON.parse(localStorage.getItem("productos"))

const agregar = (id)=>{
    let carritoStorage = JSON.parse(localStorage.getItem("carrito"))
    let objeto = recuperado.find(producto=> producto.id=== id)
    
    if(carritoStorage){
        let nuevoCarrito = carritoStorage;
        nuevoCarrito.push(objeto)
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito))
        let total = nuevoCarrito.reduce((acum,producto)=> acum + producto.precio,0)
        console.log(`el total de carrito es de : ${total}`)
    }else{
        let carrito = [objeto]
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    
}

const eliminar = (id)=>{
let storage = JSON.parse(localStorage.getItem("carrito"))
let nuevoStorage = storage.filter(producto => producto.id != id)
localStorage.setItem("carrito", JSON.stringify(nuevoStorage))
let total = nuevoStorage.reduce((acum,producto)=> acum - producto.precio, 0)
        console.log(`èl total de carrito es de : ${total}`)
}


recuperado.forEach(producto=>{
let div = document.createElement("div")
div.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${producto.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">${producto.precio}</p>
      <button id="botonA${producto.id}" class="btn btn-primary">Agregar</button>
      <button id = "botonE${producto.id}" class="btn btn-danger">Eliminar</button>
     
    </div>
  </div>
    `
contenedor.append(div)

let botona = document.getElementById(`botonA${producto.id}`)
let botone = document.getElementById(`botonE${producto.id}`)
botona.addEventListener("click",()=>{ agregar(producto.id)})
botone.addEventListener("click",()=>{ eliminar(producto.id)})

});
