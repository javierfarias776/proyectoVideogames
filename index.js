


fetch("data.json")
.then(response =>response.json())
.then(data=>{
  data.forEach(producto=>{
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
    botona.addEventListener("click",()=>{
      Toastify({
        text: `Agregaste ${producto.nombre} a carrito`,
        duration: 2000,
        funcion:agregar(producto.id),
        offset: {
          x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
      }).showToast();
    })
    
    
    botone.addEventListener("click",()=>{
      Swal.fire({
        title: "Estas seguro?",
        text: `Se eliminara ${producto.nombre} del carrito`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminado!",
            text: `Se ha eliminado ${producto.nombre} del carrito`,
            icon: "success",
            funcion : eliminar(producto.id)
          });
        }
      });
    })
    
    });
    const agregar = (id)=>{
      let carritoStorage = JSON.parse(localStorage.getItem("carrito"))
      let objeto = data.find(producto=> producto.id=== id)
      
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
})






