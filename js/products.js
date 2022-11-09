const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let currentProductsArray = [];
let currentSortCriteriaProd = undefined;
let minCount = undefined;
let maxCount = undefined;
const ORDER_ASC_BY_PRICE = "1a2a3";
const ORDER_DESC_BY_PRICE = "3a2a1";
const ORDER_BY_SOLD_COUNT = "Cant.";

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

function showProductsList() {

    let htmlContentToAppend = "";

    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            let { id, image, description, name, currency, cost, soldCount } = product;

            htmlContentToAppend += `
                <div onclick="setProductID(${id})" class="list-group-item list-group-item-action cursor-active" id="targetBuscador">
                            <div class="row">
                                <div class="col-3">
                                    <img src="${image}" alt="${description}" class="img-thumbnail">
                                </div>
                                <div class="col">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h4 class="mb-1">${name} - ${currency} ${cost}</h4>
                                        <small class="text-muted">${soldCount} artículos</small>
                                    </div>
                                    <p class="mb-1">${description}</p>
                                </div>
                            </div>
                            </div>
                            `;

            document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
        }
    }
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteriaProd = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteriaProd, currentProductsArray);

    showProductsList();
}




document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            console.log(resultObj.data.catName); //console log para ver nombre de la categoría, no guardado en localStorage
            document.getElementById("CatName").innerHTML += resultObj.data.catName
            currentProductsArray = resultObj.data.products;
            showProductsList();
        }
    })

    document.getElementById("sortAscPro").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDescPro").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilterPro").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMinPro").value = "";
        document.getElementById("rangeFilterCountMaxPro").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCountPro").addEventListener("click", function () {

        minCount = document.getElementById("rangeFilterCountMinPro").value;
        maxCount = document.getElementById("rangeFilterCountMaxPro").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });

});

//Intento desafiate 2. 
// document.getElementById("searchProducts").addEventListener("keyup", (e)=>{
//     var inputSearch = document.getElementById("searchProducts");
//     var searchProductArray = currentProductsArray.filter(e => e.includes('inputSearch.value'));
//     currentProductsArray = searchProductArray;
//     showProductsList();
// });

document.getElementById("nombreUsuarioPro").innerHTML = (localStorage.getItem("user"));