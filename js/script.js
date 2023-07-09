/* TOMO COMO LA LISTA DEL HTML DONDE IRAN LOS PRODUCTOS */
let Products_grid = document.getElementById("Products_grid")
/* GENERO UNA PROMESA DONDE CREA TODOS LOS ELEMENTOS DE LA BASE DE DATOS EN JSON */
    const pedirPosts = async () => {
        const resp = await fetch('../storage/data.json')
        const data = await resp.json()
       /* CREA LOS ELEMENTOS DEL CARRITO */
        data.forEach((post) => {
            if (post.style == "Dark") {
                var li = document.createElement('li')
                li.classList.add('Grid_item')
                li.innerHTML = `
                    <button class="ButtonProd"id="${post.buttonid}"></button>
                    <label for="${post.buttonid}">
                                <div class="Product_card">
                                    <div class="Card_info">
                                        <h3 class="Product_title">${post.productoCard}</h3>
                                        <div class="text_hovered">
                                            <h3 class="Product_title_hovered White_text_h">${post.productoCard}</h3>
                                        </div>
                                        <div class="Price">
                                            <p class="Price_txt White_text">$${post.precio}</p>
                                            <p class="Price_hovered White_text_h">$${post.precio}</p>
                                        </div>
                                    </div>
                                    <div class="Card_product">
                                        <img src="${post.img}" alt="">
                                        <span><h3 class="Add_Carrito White_text_h">Añadir al carrito ></h3></span>
                                    </div>
                                </div>
                    </label>
                `
            /* SI EL ELEMENTO ES OSCURO COMO LA CHOMBA LOS CREA CON UN ESTILO CLARO */
            }else{
                var li = document.createElement('li')
                li.classList.add('Grid_item')
                li.innerHTML = `
                    <button class="ButtonProd"id="${post.buttonid}"></button>
                    <label for="${post.buttonid}">
                            <div class="Product_card">
                                <div class="Card_info">
                                    <h3 class="Product_title">${post.productoCard}</h3>
                                    <div class="text_hovered">
                                        <h3 class="Product_title_hovered">${post.productoCard}</h3>
                                    </div>
                                    <div class="Price">
                                        <p class="Price_txt">$${post.precio}</p>
                                        <p class="Price_hovered">$${post.precio}</p>
                                    </div>
                                </div>
                                <div class="Card_product">
                                    <img src="${post.img}" alt="">
                                    <span><h3 class="Add_Carrito">Añadir al carrito ></h3></span>
                                </div>
                            </div>
                    </label>
                `
            }/* AÑADE LOS ELEMENTOS A LA LISTA */
            Products_grid.append(li)
        })
        /* Asignno a botones a todos los elementos de la clase de ButonProd */
var botones = document.getElementsByClassName("ButtonProd")
//De esta manera evito tener muchas variables de distintos botones y me permite agregar o quitar con facilidad mas botones en caso de que lo necesite
/* Luego recorro todos los botones añadiendo un listener a cada uno para controlar cuando se les clickea,
y añado la funcion La cual segun el id del boton que se clickeo añade dicho objeto al carrito*/
for (var i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", respuestaClickProd)
    function respuestaClickProd(){
        var boton2 = this.id;
        switch (boton2) {
            case "ButtonChomba":
                agregarCarrito(data[0])
                NewProductNotification(data[0])
                GuardarlistaLS()
                break;
            case "ButtonRemera":
                agregarCarrito(data[1])
                NewProductNotification(data[1])
                GuardarlistaLS()
                break;
            case "ButtonCuaderno":
                agregarCarrito(data[2])
                NewProductNotification(data[2])
                GuardarlistaLS()
                break;
            case "ButtonCD":
                agregarCarrito(data[3])
                NewProductNotification(data[3])
                GuardarlistaLS()
                break;
            case "ButtonGorraGradient":
                agregarCarrito(data[4])
                NewProductNotification(data[4])
                GuardarlistaLS()
                break;
            case "ButtonGorraBlackAndWhite":
                agregarCarrito(data[5])
                NewProductNotification(data[5])
                GuardarlistaLS()
                break;
            case "ButtonTaza":
                agregarCarrito(data[6])
                NewProductNotification(data[6])
                GuardarlistaLS()
                break;
            case "ButtonCubrebocas":
                agregarCarrito(data[7])
                NewProductNotification(data[7])
                GuardarlistaLS()
                break;
            case "ButtonStickers":
                agregarCarrito(data[8])
                NewProductNotification(data[8])
                GuardarlistaLS()
                break;
            case "ButtonPendrive":
                agregarCarrito(data[9])
                NewProductNotification(data[9])
                GuardarlistaLS()
                break;
        }
    }
}

    }
pedirPosts()

/* Crea una nueva lista y verifica si existe una ya guardada en localStorage de ser asi recupera el valor guardado con anterioridad y crea un carrito*/
var lista = []
var listaLS = JSON.parse(localStorage.getItem('ListaLS'))
if(listaLS){
    lista = listaLS;
}
/* Instancio un objeto carrito con la lista de objetos, el total del carrito y la cantidad de objetos del mismo */
var carrito = {lista, total: 0, cantidad: lista.length};

/* Hago que el boton del carrito abra el panel lateral*/
var shadow_layer = document.getElementById("Shadow_layer")
var carrito_lateral = document.getElementById("Carrito_lateral")
var botonCarrito = document.getElementById("ButtonCarrito")
botonCarrito.onclick = () => {
    CalcularTotal()
    switch_visibilidad_paneles(carrito_lateral, shadow_layer)
    AbrirCarrito()
    console.log(carrito.lista)
}

/* Clickear en la sombra oculta el panel del carrito */
shadow_layer.addEventListener("click", respuestaClickShadow)

function respuestaClickShadow(){
    shadow_layer.classList.remove('is-visible');
    if (carrito_lateral.classList.contains('speed-in')){
        carrito_lateral.classList.remove('speed-in')
    }
}
// seteo el margin-top de carrito dependiendo de la altura del header
var headerElement = document.getElementById("Header_merch");
var headerHeight = headerElement.offsetHeight;
var headerBoxShadow = window.getComputedStyle(headerElement).boxShadow;
//var headerBoxShadowY = +headerBoxShadow.split("px")[2].trim(); 
carrito_lateral.style.marginTop = headerHeight + 'px';

/* UTILIZO LA LIBRERIA DE SWEET ALERT PARA CREAR UNA NOTIFICACION QUE SALE AL PRESIONAR EL BOTON VERDE DE COMPRAR EN EL PANEL LATERAL */
let NotificacionCheckout = document.getElementById("Boton_comprar")
NotificacionCheckout.addEventListener('click', NotiCheckout)
/* FUNCION QUE CREA LA NOTIFICACION DEL CHECKOUT */
function NotiCheckout(){
    Swal.fire({
        title: 'Gracias por tu compra!',
        text: "Seras redirigido a la pagina de compra",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ir al checkout',
        cancelButtonText: 'Seguir comprando'
    }).then((result) => {
        if (result.isDismissed) {
            respuestaClickCarrito();
        }
      })
}

/* FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES*/

/* FUNCION QUE CREA Y QUITA LAS NOTIFICACINOES DE CADA PRODUCTO AL AÑADIRLOS*/
function NewProductNotification(objeto){
    let SideNotification = document.getElementById("Side_notification")
    let NewNotification = document.createElement("div")
    NewNotification.className = "New_notification";
    NewNotification.innerHTML = `<h3>Agregado exitosamente al carrito!</h3>
                            <p><b>Articulo:</b> ${objeto.producto}</p>
                            <b>$${objeto.precio}</b>`;
    SideNotification.append(NewNotification)

    setTimeout(function(){
        NewNotification.classList.add('Hide_notification');
        setTimeout(function(){
            NewNotification.remove()
        }, 500);
    }, 3500);
}


/* FUNCION QUE SETEEA LOS VALORES AL ABRIR EL PANEL LATERAL DEL CARRITO */
function AbrirCarrito(){
    let ProductosCarritoLateral = document.getElementById("Prods_carro_lateral")
    let VerificadorCarrito = document.getElementsByClassName("Producto_individual")
    /* SI LA CANTIDAD DE ELEMENTOS DEL CARRITO NO COINCIDE CON LA CANTIDAD DE ELEMENTOS DEL PANEL LATERAL CREA LOS ELEMENTOS RESTANTES QUE AUN NO ESTAN EN EL PANEL LATERAL */
    if (carrito.lista.length != VerificadorCarrito.length){
        for (let i = VerificadorCarrito.length; i < carrito.lista.length; i++){
        let NewProductoCarrito = document.createElement("li")
        NewProductoCarrito.className = "Producto_individual";
        NewProductoCarrito.id = "Elemento_carritoN_" + i;
        NewProductoCarrito.innerHTML = `
                                    <div>
                                        <span class="cd-qty">1x </span>
                                        <span>${carrito.lista[i].producto}</span>
                                        <div class="Producto_precio">$${carrito.lista[i].precio}</div>
                                    </div>
                                    <a href="#0" class="Producto_remover cd-img-replace id:${carrito.lista[i].identificador}" id="${i}"></a>`;
        ProductosCarritoLateral.append(NewProductoCarrito)
        } 
    } //COMENTARIO PERSONAL, SE PIENSA AGREGAR AQUI UNA FUNCION QUE ACTUALICE LOS PRECIOS DEL PANEL LATERAL SI POR ALGUNA RAZON LOS PRECIOS DE LOS PRODUCTOS CAMBIAN EN EL JSON
    /* AL ABRIR EL PANEL LATERAL EL PRECIO TOTAL SE ACTUALIZA CON CalcularTotal() */
    let PrecioTotal = document.getElementById("Precio_carrito_total")
    CalcularTotal();
    PrecioTotal.innerHTML =`$ ${carrito.total}`

    /* ELIMINAR PRODUCTOS DEL CARRITO */

/* OBTENGO TODOS LOS BOTONES DE CERRAR */
    var CerrarProd = document.getElementsByClassName("Producto_remover");
    /* RECORRO TODOS LOS ELEMENTOS DEL ARRAY DE BOTONES QUE CIERRAN, Y OBTENIENDO EL NOMBRE DEL PRODUCTO LOS ELIMINA DEL LOCAL STORAGE Y DEL PANEL LATERAL */
    for (var i = 0; i < CerrarProd.length; i++) {
        CerrarProd[i].addEventListener("click", function(event) {
            event.preventDefault();
            /* OBTENGO EL TITULO DEL PRODUCTO A ELIMINAR */
            let TituloProductoEliminado = this.previousElementSibling.lastChild.previousElementSibling.previousElementSibling.innerHTML;
            /* BUSCO EL OBJETO A ELMINIAR EN EL CARRITO */
            let objelimin = carrito.lista.find(o => o.producto === TituloProductoEliminado);
            console.log("Objeto eliminado: "+objelimin)
            /* UNA VEZ OBTENGO EL PRODUCTO BUSCO SU INDICE CON INDEXOF */
            idprod = carrito.lista.indexOf(objelimin)
            console.log("IdQueElimina: "+idprod)
            /* Y LO ELIMINO DEL CARRITO Y GUARDO EL CARRITO ACTUALIZADO EN EL LOCALSTORAGE */
            carrito.lista.splice(idprod,1)
            GuardarlistaLS()
            
            /* OBTENGO EL LI DEL BOTON QUE ESTOY PRESIONANDO PARA CERRAR*/
            let ProdCerrado = this.parentElement;
            /* LE DOY UNA CLASE PARA DARLE UNA ANIMACION DE QUE SE CIERRA */
            ProdCerrado.classList.add('Removed');
            /* Y LO QUITO UNA VEZ TERMINA EL TIEMPO DE LA ANIMACION */
            setTimeout(function(){
                ProdCerrado.remove()
            }, 300);

            /* MUESTRO EL CARRITO SOLO PARA REVISAR */
            console.log("ListaCarrito")
            console.log(carrito.lista)
            /* ACTUALIZO EL PRECIO TOTAL QUITANDO EL ELEMENTO SELECCIONADO */
            let PrecioTotal = document.getElementById("Precio_carrito_total")
            CalcularTotal();
            PrecioTotal.innerHTML =`$${carrito.total}`;
        })
    }
    
}
    
/* FUNCION QUE GUARDA LA LISTA DEL CARRITO EN localStorage */
function GuardarlistaLS(){
    const GuardarLocal = (clave, valor) => {
        localStorage.setItem(clave, valor)
    };
    GuardarLocal("ListaLS", JSON.stringify(carrito.lista));
}

/* FUNCION QUE AGREGA UN ELEMENTO AL CARRITO */
function agregarCarrito(objeto){
    carrito.lista.push(objeto);
    console.log("Has añadido: " + objeto.producto + " al carrito" )
}

/* FUNCION QUE SUMA CADA ELEMENTO DEL CARRITO Y DEVUELVE EL TOTAL */
function CalcularTotal(){
    carrito.total=0
    carrito.lista.forEach(objeto => {
        carrito.total = carrito.total + objeto.precio
    });
}
/* FUNCION QUE CAMBIA LA VISIBILIDAD ENTRE EL PANEL LATERAL Y LA CAPA DE SOMBRA */
function switch_visibilidad_paneles(panel_lateral, shadow_layer) {
    if (panel_lateral.classList.contains('speed-in')) {
        panel_lateral.classList.remove('speed-in')
        shadow_layer.classList.remove('is-visible')
    } else {
        panel_lateral.classList.add('speed-in')
        shadow_layer.classList.add('is-visible')
    }
}

