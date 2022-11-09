// Variables de tipo array, vacios, para utilizar en las diferentes funciones 
// que permiten mostrar la información deseada

let currentProductInfoArray = [];
let currentProductInfoImages = [];
let relatedProductsArray = [];
let productComentsArray = [];
let arrCarritoID = [];

//Constantes con código HTML para cada uno de los scores posibles
const scoreCero = '<span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreUno = '<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreDos = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreTres = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreCuatro = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>';
const scoreCinco = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';


function setcarritoID(id) {

    //1.Procedimiento si no existe el array en el localStorage

    //Traigo del localStorage el item
    let carritoStorage = JSON.parse(localStorage.getItem("carritoID"));

    //Verifico si existe el elemento.
    if (!carritoStorage) {

        //Pusheo info que me interesa, con el formato adecuado, al array que luego colocaré en el localStorage.

        arrCarritoID.push({
            "id": currentProductInfoArray.id,
            "name": currentProductInfoArray.name,
            "count": 1,
            "unitCost": currentProductInfoArray.cost,
            "currency": currentProductInfoArray.currency,
            "image": currentProductInfoArray.images[0]
        });

        // Igualo el item anterior al array global
        carritoStorage = arrCarritoID;

        //Guardo el array en el localStorage
        localStorage.setItem("carritoID", JSON.stringify(carritoStorage));
    }

    //2. Procedimiento si YA existe el array en el localStorage y necesito agregar un nuevo id de producto al mismo

    else if (carritoStorage) {

        //Traigo el el array del localStorage y lo parseo
        arrCarritoID = JSON.parse(localStorage.getItem("carritoID"));

        //Pusheo la info que me interesa en el formado adecuado al array que luego colocaré en el localStorage

        arrCarritoID.push({
            "id": currentProductInfoArray.id,
            "name": currentProductInfoArray.name,
            "count": 1,
            "unitCost": currentProductInfoArray.cost,
            "currency": currentProductInfoArray.currency,
            "image": currentProductInfoArray.images[0]
        });

        // Igualo el array contenedor al array que voy a colocar en el localStorage.
        carritoStorage = arrCarritoID;

        //Coloco el array mencionado en el localStorage mediante JSON.stringify

        localStorage.setItem("carritoID", JSON.stringify(carritoStorage));
    };

};

function showProductInfo() {

    let { description, name, currency, cost, soldCount, category, id } = currentProductInfoArray;

    //Seria bueno encontrar la forma de visualizar las imagenes en alta resolución SIN salirse de la página actual.
    document.getElementById("productInfo-list-container").innerHTML += `
                <br>
                <div class="container">
                <br>
                <h3><strong>${name}</strong></h3> <button type="button" class="buttonComprar" id="buttonComprar" onclick="setcarritoID(${id})">Comprar</button>
                <br>
                <hr>
                <h6><strong>Precio</strong></h6>
                <p>${currency}  ${cost}</p>
                <br>
                <h6><strong>Descripción</strong></h6>
                <p>${description}</p>
                <br>
                <h6><strong>Categoría</strong></h6>
                <p>${category}</p>
                <br>
                <h6><strong>Cantidad de vendidos</strong></h6>
                <p>${soldCount}</p>
                </div>
                `;

    currentProductInfoImages = currentProductInfoArray.images;

    document.getElementById("carousel-inner").innerHTML += `
    <div class="carousel-item active" data-bs-interval="2000">
        <img src="${currentProductInfoImages[0]}"  height="300px" width="400px">
        </div>
    `

    for (let b = 1; b < currentProductInfoImages.length; b++) {

        let image = currentProductInfoImages[b];

        document.getElementById("carousel-inner").innerHTML += `
        <div class="carousel-item" data-bs-interval="2000">
        <img src="${image}"   height="300px" width="400px">
        </div>
                `;
    }
};



// Función para mostrar estrellas según score
function showStars(score) {
    if (score == 0) {
        return scoreCero
    };

    if (score == 1) {
        return scoreUno
    };

    if (score == 2) {
        return scoreDos
    };

    if (score == 3) {
        return scoreTres
    };

    if (score == 4) {
        return scoreCuatro
    };

    if (score == 5) {
        return scoreCinco
    };

};

function showProductComents() {

    let htmlContentToAppendComents = "";

    for (let i = 0; i < productComentsArray.length; i++) {
        let coment = productComentsArray[i];

        let { user, dateTime, score, description } = coment;

        htmlContentToAppendComents += `
        <div class="container">
        <div class="caja">
        <p><strong>${user}</strong>-${dateTime}- ${showStars(score)}</p>
        <p>${description}</p>
        </div>
        </div>
        `;

        document.getElementById("productComents-container").innerHTML = htmlContentToAppendComents;
    }
};

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

function showRelatedProducts() {

    let htmlContentToAppend = "";

    for (let i = 0; i < relatedProductsArray.length; i++) {
        let relproduct = relatedProductsArray[i];

        let { id, name, image } = relproduct;


        htmlContentToAppend += `
                <div onclick="setProductID(${id})" class="list-group-item list-group-item-action cursor-active">
                <div class="container">
                <div class="row">
                <div class="col-sm-6 col-md-3">
                <img src="${image}" class="img-thumbnail"> 
                <h5>${name}</h5>
                </div>
                </div>
                </div>
                </div>
                <br>
                `;

        document.getElementById("related-products-list").innerHTML = htmlContentToAppend;
    }
};



document.addEventListener("DOMContentLoaded", function (e) {

    //Petición web mediante función getJSONData para obtener JSON con información de productos

    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductInfoArray = resultObj.data;
            relatedProductsArray = currentProductInfoArray.relatedProducts
            showProductInfo();
            showRelatedProducts();
        }
    });

    //Petición web mediante función getJSONData para obtener JSON con comentarios de productos

    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComentsArray = resultObj.data;
            showProductComents();
        }
    })
});

//Código para agregar comentario luego de hacer click en el botón enviar

//Escuchador en el botón asociado al evento click
document.getElementById("sendComent").addEventListener("click", (e) => {

    //Código para obtener fecha y hora del comentario

    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    //Contenido a agregar en product-info.html

    document.getElementById("productComents-container").innerHTML += `
    <div class="container">
        <div class="caja">
            <p><strong>${localStorage.getItem("usuario")}</strong>-${date + ' ' + time}- ${showStars(document.getElementById("puntuacion").value)}</p>
            <p>${document.getElementById("opinion").value}</p>
        </div>
    </div>
    `;

    //Luego de publicado el comentario, se deja vacio el campo opinión.

    document.getElementById("opinion").value = "";
});

document.getElementById("nombreUsuarioPro").innerHTML = (localStorage.getItem("user"));
