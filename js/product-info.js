let currentProductInfoArray = [];
let productComentsArray = [];
// const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/" + ID + EXT_TYPE
//Constantes con código HTML para cada uno de los scores posibles
const scoreCero = '<span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreUno = '<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreDos = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreTres = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreCuatro = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>';
const scoreCinco = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';

function showProductInfo() {

    let htmlContentToAppend = "";

    let { images, description, name, currency, cost, soldCount, category } = currentProductInfoArray;

    //Seria bueno encontrar la forma de visualizar las imagenes en alta resolución SIN salirse de la página actual.
    htmlContentToAppend += `
                <br>
                <div class="container">
                <h3>${name}</h3>
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
                <div class="container">
                <h6><strong>Imagenes ilustrativas</strong></h6>
                <div class="row">
                <div class="col-sm-6 col-md-3">
                <a href="${images[0]}" class="thumbnail">
                <img src="${images[0]}" class="img-thumbnail">
                </a> 
                </div>
                <div class="col-sm-6 col-md-3">
                <a href="${images[1]}" class="thumbnail">
                <img src="${images[1]}" class="img-thumbnail">
                </a>
                </div>
                <div class="col-sm-6 col-md-3">
                <a href="${images[2]}" class="thumbnail">
                <img src="${images[2]}" class="img-thumbnail">
                </a>
                </div>
                <div class="col-sm-6 col-md-3">
                <a href="${images[3]}" class="thumbnail">
                <img src="${images[3]}" class="img-thumbnail">
                </a>
                </div>
                </div>
                </div>
                `;
    document.getElementById("productInfo-list-container").innerHTML = htmlContentToAppend;
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


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductInfoArray = resultObj.data;
            showProductInfo();
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComentsArray = resultObj.data;
            showProductComents();
        }
    })
});





    document.getElementById("nombreUsuarioProInfo").innerHTML = (localStorage.getItem("usuario")); //Agregar correo de usuario arriba
