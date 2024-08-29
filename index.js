const contenedor = document.getElementById("contenedor")
const verCarrito = document.getElementById("verCarrito")
const botonCarrito= document.getElementById("botonCarrito")
const totalContainer = document.getElementById("totalContainer")

let carrito = [];
//nos traemos nuestros articulos del archivo data.json
fetch("data.json")
.then(response =>response.json())
.then(data=>{
//recorremos el array y creamos nuestra card para mostrar nuestros articulos
  data.forEach(producto=>{
    let div = document.createElement("div")
    div.innerHTML = `
    <div class="card card-hover" style="width: 18rem;">
    <img src="${producto.img}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">${producto.precio}</p>
    <button id="boton${producto.id}" class="btn btn-primary">Agregar</button>
    </div>
    </div>
    
    
    `
    //pusheamos al id="contenedor" que esta en el html
    contenedor.append(div)
    //seleccionamos la etiqueta id="boton" y le agregamos el evento escucha para agregar a carrito
    let boton = document.getElementById(`boton${producto.id}`)
    boton.addEventListener("click",()=>{
        let repeat = carrito.some((repeatProduct)=>repeatProduct.id === producto.id)
        Toastify({
          text: `Agregaste ${producto.nombre} a carrito`,
          duration: 2000,
          offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        }).showToast();
      
            if(repeat){
                carrito.map((prod)=>{
                    if(prod.id === producto.id){
                        prod.cantidad++
                    }
                })
            }else{
              carrito.push(producto)
              console.log(carrito)
              console.log(carrito.length)
            }
            
          }); 
        });
      });

      
//creamos una funcion para mostrar los productos del carrito en el modal

const mostrarCarrito =()=>{
  if(carrito.length === 0){
    verCarrito.innerHTML = "No hay productos en el carrito"
  }else{
    verCarrito.innerHTML = "";
  }

  carrito.forEach((producto)=>{
      let div = document.createElement("div")
      div.innerHTML=`
     <div class="card mb-4" style="max-width: 540px; back-modal">
  <div class="row">
    <div class="col-md-8">
      <img src="${producto.img}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-4">
      <div class="card-body body-card-modal">
        <h5>${producto.nombre} </h5>
        <p>Precio:${producto.precio}$ Cantidad: ${producto.cantidad}</p>
        
    <button id="botone${producto.id}" class="btn btn-danger rounded-end">Eliminar</button>
      </div>
    </div>
  </div>
</div>
        `;
        verCarrito.append(div);
        //seleccionamos la etiqueta botone del carrito
        let botone = document.getElementById(`botone${producto.id}`);

        //creamos la funcion eliminar por id
        const eliminarProducto =(id)=>{
            const found = carrito.find((producto)=>producto.id === id)
            carrito= carrito.filter((productoId)=>{
                return productoId !== found
            })
            //llamamos a la funcion mostrar carrito para que nos muestre el nuevo array con los productos filtrados
            mostrarCarrito()
        }
        //agregamos el evento escucha al botone para eliminar productos
        botone.addEventListener("click", ()=>{
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
                funcion : eliminarProducto(producto.id)
              });
            }
          });
            
        })
    });
    
    //calculamos el total del carrito y lo renderizamos al dom del modal
    let total = carrito.reduce((acc,el)=> acc + el.precio * el.cantidad,0)
    totalContainer.innerHTML="" // limpiamos el total en el modal cada que hagan click
    let div = document.createElement("div")
    div.innerHTML= `Total: $${total}`
    totalContainer.append(div)
  }
  //agregamos el evento escucha a  botonCarrito para que nos muestre los productos seleccionados en el modal
  botonCarrito.addEventListener("click", mostrarCarrito)
     
    
        
    







