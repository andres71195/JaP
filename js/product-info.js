let currentProductInfoArray = [];
let currentProductInfoImages = [];
let relatedProductsArray = [];
let productComentsArray = [];
// const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/" + ID + EXT_TYPE
//Constantes con código HTML para cada uno de los scores posibles
const scoreCero = '<span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreUno = '<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreDos = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreTres = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreCuatro = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>';
const scoreCinco = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';


function setcarritoID(id) {
    localStorage.setItem("carritoID", id);
    alert("Producto añadido a tu carrito");
}

function showProductInfo() {

    let {description, name, currency, cost, soldCount, category, id} = currentProductInfoArray;

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

for (let image of currentProductInfoImages) {

    document.getElementById("productInfo-images").innerHTML += `
                <div class="col-sm-6 col-md-3">
                <a href="${image}" class="thumbnail">
                <img src="${image}" class="img-thumbnail">
                </a> 
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

    for(let i = 0; i < productComentsArray.length; i++){
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

    for(let i = 0; i < relatedProductsArray.length; i++){
        let relproduct = relatedProductsArray[i];

    let {id, name, image} = relproduct;


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
    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductInfoArray = resultObj.data;
            relatedProductsArray = currentProductInfoArray.relatedProducts
            showProductInfo();
            showRelatedProducts();
            console.log(currentProductInfoImages);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComentsArray = resultObj.data;
            showProductComents();
        }
    })
});

document.getElementById("sendComent").addEventListener("click", (e) => {
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();

    document.getElementById("productComents-container").innerHTML += `
    <div class="container">
    <div class="caja">
    <p><strong>${localStorage.getItem("usuario")}</strong>-${date + ' '+ time}- ${showStars(document.getElementById("puntuacion").value)}</p>
    <p>${document.getElementById("opinion").value}</p>
    </div>
    </div>
    `;
    document.getElementById("opinion").value = "";
});

document.getElementById("nombreUsuarioPro").innerHTML = (localStorage.getItem("usuario"));
