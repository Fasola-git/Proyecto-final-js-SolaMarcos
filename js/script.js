let Products_grid = document.getElementById("Products_grid")

    const pedirPosts = async () => {
        const resp = await fetch('../storage/data.json')
        const data = await resp.json()
       
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
            }
            Products_grid.append(li)
        })
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
                agregarCarrito(objeto1)
                NewProductNotification(objeto1)
                GuardarlistaLS()
                break;
            case "ButtonRemera":
                agregarCarrito(objeto2)
                NewProductNotification(objeto2)
                GuardarlistaLS()
                break;
            case "ButtonCuaderno":
                agregarCarrito(objeto3)
                NewProductNotification(objeto3)
                GuardarlistaLS()
                break;
            case "ButtonCD":
                agregarCarrito(objeto4)
                NewProductNotification(objeto4)
                GuardarlistaLS()
                break;
            case "ButtonGorraGradient":
                agregarCarrito(objeto5)
                NewProductNotification(objeto5)
                GuardarlistaLS()
                break;
            case "ButtonGorraBlackAndWhite":
                agregarCarrito(objeto6)
                NewProductNotification(objeto6)
                GuardarlistaLS()
                break;
            case "ButtonTaza":
                agregarCarrito(objeto7)
                NewProductNotification(objeto7)
                GuardarlistaLS()
                break;
            case "ButtonCubrebocas":
                agregarCarrito(objeto8)
                NewProductNotification(objeto8)
                GuardarlistaLS()
                break;
            case "ButtonStickers":
                agregarCarrito(objeto9)
                NewProductNotification(objeto9)
                GuardarlistaLS()
                break;
            case "ButtonPendrive":
                agregarCarrito(objeto10)
                NewProductNotification(objeto10)
                GuardarlistaLS()
                break;
        }
    }
}

/* Hago que el boton del carrito lo muestre */
var shadow_layer = document.getElementById("Shadow_layer")
var carrito_lateral = document.getElementById("Carrito_lateral")
var botonCarrito = document.getElementById("ButtonCarrito")
botonCarrito.onclick = () => {
    CalcularTotal()
    respuestaClickCarrito()
    AbrirCarrito()
}
function respuestaClickCarrito(){
    switch_visibilidad_paneles(carrito_lateral, shadow_layer);
} 

/*
    NO DAR IMPORTANCIA
    var carrito_icon = document.getElementById("Carrito_icon")

    carrito_icon.addEventListener("click", respuestaClickCarrito)
    carrito_icon.onclick = () => {
        respuestaClickCarrito()
    }
*/

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


/* FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES FUNCIONES*/

/* FUNCION QUE CREA Y QUITA LAS NOTIFICACINOES DE CADA PRODUCTO */
function NewProductNotification(objeto){/* COMENTARIO PERSONAL: Cambiar las notificaciones utilizando la libreria de toastify */
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
    if (carrito.lista.length != VerificadorCarrito.length){
        for (let i = VerificadorCarrito.length; i < carrito.lista.length; i++){
        let NewProductoCarrito = document.createElement("li")
        NewProductoCarrito.className = "Producto_individual";
        NewProductoCarrito.innerHTML = `
                                    <div>
                                        <span class="cd-qty">1x </span>
                                        <span>${carrito.lista[i].producto}</span>
                                        <div class="Producto_precio">$${carrito.lista[i].precio}</div>
                                    </div>
                                    <a href="#0" class="Producto_remover cd-img-replace"></a>`;
        ProductosCarritoLateral.append(NewProductoCarrito)                  
        } 
    }
    let PrecioTotal = document.getElementById("Precio_carrito_total")
    CalcularTotal();
    PrecioTotal.innerHTML =`$ ${carrito.total}`
}

                // ---------------------------------------//
                // -------------- QUITAR -----------------//
                // ------------- PRODUCTOS ---------------//
                // ------------ DEL CARRITO --------------//
                // ---------------------------------------//
    var elementos = document.getElementsByClassName("Producto_remover");
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].addEventListener("click", RespuestaClickRemover)
        function RespuestaClickRemover(){
            console.log("ClickTest")
            let precio = elementos[i].previousElementSibling.lastElementChild.innerHTML
            let nombre = precio.previousElementSibling.innerHTML
            console.log(precio)
            console.log(nombre)
            //REMOVER LOS PRODUCTOS EN LOCAL STORAGE
            let i = carrito.lista.indexOf(Object.producto == nombre)
            carrito.lista.splice(i,1)
            GuardarlistaLS()
            //CALCULO PRECIO TOTAL
            let PrecioTotal = document.getElementById("Precio_carrito_total")
            CalcularTotal();
            PrecioTotal.innerHTML =`$ ${carrito.total}`;
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
    console.log(carrito)
}

function switch_visibilidad_paneles(panel_lateral, shadow_layer) {
    if (panel_lateral.classList.contains('speed-in')) {
        panel_lateral.classList.remove('speed-in')
        shadow_layer.classList.remove('is-visible')
    } else {
        panel_lateral.classList.add('speed-in')
        shadow_layer.classList.add('is-visible')
    }
}

