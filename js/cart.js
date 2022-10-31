let cartArticlesArray = [];
let newCartArticleArray = [];
let arrContainer = [];

//inputs Tipo de envío
let premium_shipping = document.getElementById("premium_shipping");
let express_shipping = document.getElementById("express_shipping");
let standard_shipping = document.getElementById("standard_shipping");

//Inputs de formas de pago
let inputBankTransfer = document.getElementById("bankTransfer");
let inputBankAccount = document.getElementById("bankAccount");

let inputCreditCard = document.getElementById("creditCard");
let inputnumCard = document.getElementById("numCard");
let inputcodCard = document.getElementById("codCard");
let inputexpCard = document.getElementById("expCard");

//Elementos <p> que muestran feedback invalido fuera del modal
let feedbackPayForm = document.getElementById("feedback-payForm");
let feedbackPayFormField = document.getElementById("feedback-payFormField");

//Función para desactivar los campos de Tarjeta de crédito al seleccionar transferencia bancaria
function disableCreditCard() {
    inputnumCard.disabled = true;
    inputcodCard.disabled = true;
    inputexpCard.disabled = true;
    inputBankAccount.disabled = false;
    document.getElementById("spanpayForm").innerHTML = `Transferencia bancaria.`;
    invalidFeedback_OF()
};
//Función para desactivar los campos de Transferencia bancaria al seleccionar Tarjeta de crédito
function disableBankTransfer() {
    inputBankAccount.disabled = true;
    inputnumCard.disabled = false;
    inputcodCard.disabled = false;
    inputexpCard.disabled = false;
    document.getElementById("spanpayForm").innerHTML = `Tarjeta de crédito.`;
    invalidFeedback_OF()
};

//Función para establecer el nuevo subtotal general luego de modificar la cantidad de los productos del carrito
function new_subTotal_General() {

    let products_subTotal = document.querySelectorAll(".subTotal");

    let subtotal_General = 0;

    console.log(products_subTotal);

    for (let i = 0; i < products_subTotal.length; i++) {
        let item = products_subTotal[i];

        if (item.innerHTML.includes('USD')) {
            subtotal_General += parseInt(item.innerHTML.replace('USD', ''));
        }
        if (item.innerHTML.includes('UYU')) {
            subtotal_General += parseInt(item.innerHTML.replace('UYU', '')) / 40;
        };

    };

    document.getElementById("subtotal_General").innerHTML = " " + subtotal_General;
};

//Función para calcular el subtotal de cada producto al modificar la cantidad
//Se le agregan al final las funciones para mostrar el nuevo subtotal general, 
//establecer un nuevo valor de costo por envio y un costo total, 
//por ser la función asociada al input de cantidad

function calcSubTotal(unitCost, index, currency) {

    let inputValue = document.getElementById(`input${index}`).value;
    let subTotal = unitCost * inputValue;
    document.getElementById(`subTotal${index}`).innerHTML = currency + " " + subTotal;
    new_subTotal_General();
    setShippingCost();
    showTotal();
};

//Función para quitar el feedback invalido para la forma de pago (fuera del modal)
function invalidFeedback_OF() {
    if (inputCreditCard.checked || inputBankTransfer.checked) {
        feedbackPayForm.innerHTML = "";
    }
};

//Función para quitar el feedback invalido para los campos de forma de pago (fuera del modal)
function invalidFeedback_OF_fields() {

    if (inputBankAccount.value || inputcodCard.value && inputexpCard.value && inputnumCard.value) {
        feedbackPayFormField.innerHTML = "";
    }

};

//Función para determinar y mostrar el costo por envío
function setShippingCost() {

    let subtotal_General = document.getElementById("subtotal_General");

    if (premium_shipping.checked) {
        document.getElementById("shippingCost").innerHTML = " " + parseInt(subtotal_General.innerHTML) * 0.15
    }
    if (express_shipping.checked) {
        document.getElementById("shippingCost").innerHTML = " " + parseInt(subtotal_General.innerHTML) * 0.07
    }
    if (standard_shipping.checked) {
        document.getElementById("shippingCost").innerHTML = " " + parseInt(subtotal_General.innerHTML) * 0.05
    };
};

//Función para determinar y mostrar el total del carrito
function showTotal() {
    let subtotal_General = document.getElementById("subtotal_General");
    let shippingCost = document.getElementById("shippingCost");

    document.getElementById("total").innerHTML = '<strong> ' + (parseInt(subtotal_General.innerHTML) + parseInt(shippingCost.innerHTML)) + '</strong>'

};

//Función asociada a los radio inputs de tipo de envío para mostrar el nuevo costo y el nuevo total
function new_shipping_Cost() {
    setShippingCost();
    showTotal();
};


//Código copiado desde bootstrap validation para mostrar el feedback.
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {

                //Feedback para forma de pago fuera del modal

                if (!inputCreditCard.checked || !inputBankTransfer.checked) {
                    feedbackPayForm.innerHTML = `Debe seleccionar una forma de pago`;
                    feedbackPayForm.style.color = "red";

                }
                if (inputCreditCard.checked || inputBankTransfer.checked) {
                    feedbackPayForm.innerHTML = "";
                }

                //Feedback para campos de forma de pago fuera del modal

                if (!inputBankAccount.value || !inputcodCard.value || !inputexpCard.value || !inputnumCard.value) {
                    feedbackPayFormField.innerHTML = `Complete los campos de forma de pago`;
                    feedbackPayFormField.style.color = "red";

                }
                if (inputBankAccount.value || inputcodCard.value && inputexpCard.value && inputnumCard.value) {
                    feedbackPayFormField.innerHTML = "";
                }



                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                if (form.checkValidity()) {
                    document.getElementById("div_Alert").innerHTML = `<div class="alert alert-success alert-dismissible" role="alert">¡Has comprado con éxito!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'`;
                    event.preventDefault()
                    event.stopPropagation()
                }

                // else {

                // }

                form.classList.add('was-validated')


            }, false,)

        })

})();


let showCartArticles = () => {

    let total = 0;
    let htmlContent = "";

    for (let i = 0; i < cartArticlesArray.articles.length; i++) {

        let article = cartArticlesArray.articles[i];

        let { id, name, image, currency, count, unitCost } = article;

        htmlContent += `
<tr>
<td><img class= "small-img" src="${image}"></td>
<td>${name}</td>
<td>${currency}  <span>${unitCost}</span></td>
<td><input type="number" style= "text-align: center" class= "form-control" min="1" value="${count}" id="input${i}" oninput = "calcSubTotal(${unitCost}, ${i}, '${currency}')" required></td>
<td><strong> <span id="subTotal${i}" class="subTotal">${currency} ${unitCost * count}</span></strong></td>
</tr>
    `;

        if (currency === 'USD') {
            total += parseInt(unitCost * count);
        }
        if (currency === 'UYU') {
            total += parseInt((unitCost * count) / 40);
        }

    };

    document.getElementById("tableProductsCart").innerHTML += htmlContent;
    document.getElementById("subtotal_General").innerHTML += total;
    setShippingCost();
    showTotal()
};

document.addEventListener("DOMContentLoaded", (e) => {

    //Creo una variable para referenciar el array del localStorage

    let arr = localStorage.getItem("carritoID");

    //A. Si el array del localStorage NO existe, hago petición web para obtener producto predetermindo y lo muestro

    if (!arr) {

        getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function (resultObj) {
            if (resultObj.status === "ok") {
                cartArticlesArray = resultObj.data;
                showCartArticles();
                showTotal();

            }
        });
    }

    // B. Si el array del localStorage SÍ existe, lo traigo, hago petición para obtener array con producto
    // precargado, pusheo los objetos del array del localStorage, y los muestro con la función

    else if (arr) {

        newCartArticleArray = JSON.parse(localStorage.getItem("carritoID"));


        getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function (resultObj) {
            if (resultObj.status === "ok") {
                cartArticlesArray = resultObj.data;

                let newArticlesArray = cartArticlesArray.articles.concat(newCartArticleArray);
                cartArticlesArray.articles = newArticlesArray;
                showCartArticles()
            }
        });

    };


});

document.getElementById("nombreUsuarioPro").innerHTML = (localStorage.getItem("usuario"));
