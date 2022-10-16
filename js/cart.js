let cartArticlesArray = [];
let newCartArticleArray = [];

function calcSubTotal(unitCost, index) {

    let inputValue = document.getElementById(`input${index}`).value;
    let subTotal = unitCost * inputValue;
    document.getElementById(`subTotal${index}`).innerHTML = subTotal;
};


const showCartArticles = () => {

    let htmlContent = "";

    for (let i = 0; i < cartArticlesArray.articles.length; i++) {

        let article = cartArticlesArray.articles[i];

        let { id, name, image, currency, count, unitCost } = article;

        htmlContent += `
<tr>
<td><img class= "small-img" src="${image}"></td>
<td>${name}</td>
<td>${currency}  <span>${unitCost}</span></td>
<td><input type="number" class= "inputCant" min="1" value="${count}" id="input${i}" oninput = "calcSubTotal(${unitCost}, ${i})"></td>
<td><strong> ${currency} <span id="subTotal${i}">${unitCost * count}</span></strong></td>
</tr>
    `

        document.getElementById("tableProductsCart").innerHTML += htmlContent;
    }



};

const showNewArticle = () => {

    let htmlContent = "";

    for (let i = 0; i < newCartArticleArray.length; i++) {

        let article = newCartArticleArray[i];

        let {name, cost, currency, images} = article;

        htmlContent += `
<tr>
<td><img class= "small-img" src="${images[0]}"></td>
<td>${name}</td>
<td>${currency}  <span>${cost}</span></td>
<td><input type="number" class= "inputCant" min="1" value="1" id="input${i+1}" oninput = "calcSubTotal(${cost}, ${i+1})"></td>
<td><strong> ${currency} <span id="subTotal${i+1}">${cost * 1}</span></strong></td>
</tr>
    `

        document.getElementById("tableProductsCart").innerHTML += htmlContent;
    }



};



document.addEventListener("DOMContentLoaded", (e) => {

    getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArticlesArray = resultObj.data;
            showCartArticles();

        } 
    })

    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("carritoID") + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            // newCartArticleArray = resultObj.data;
            newCartArticleArray.push(resultObj.data);
            console.log(newCartArticleArray);
            showNewArticle();
        }
    })

});

document.getElementById("nombreUsuarioPro").innerHTML = (localStorage.getItem("usuario"));
