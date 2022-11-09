//Inputs ubicados en my-profile

let inputEmail = document.getElementById("emailProfile");
let inputFirstName = document.getElementById("firstName");
let inputSecondName = document.getElementById("secondName");
let inputFirstSurname = document.getElementById("firstSurname");
let inputSecondSurname = document.getElementById("secondSurname");
let inputPhoneNum = document.getElementById("phoneNum");
let inputProfilePhoto = document.getElementById("profilePhotoFile");

//elemento img donde se muestra la imagen de perfil
let profilePhoto = document.getElementById("profilePhoto");

//Código bootstrap para realizar validaciones
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                if (form.checkValidity()) {

                    localStorage.setItem("fullUser", JSON.stringify({
                        firstName: inputFirstName.value,
                        secondName: inputSecondName.value,
                        firstSurname: inputFirstSurname.value,
                        secondSurname: inputSecondSurname.value,
                        email: inputEmail.value,
                        phoneNum: inputPhoneNum.value

                    }))

                }

                form.classList.add('was-validated')
            }, false)
        })
})()

//Código para guardar imagen seleccionada por usuario en el localStorage
inputProfilePhoto.addEventListener("change", function () {

    // console.log(this.files);
    //creo una constante reader, igual a un objeto FileReader() que permite leer el nuevo fichero
    const reader = new FileReader();

    //agrego un escuchador al objeto reader (FileReader()), asociado a la carga del fichero
    reader.addEventListener("load", () => {
        //guardo el resultado en el local Storage
        localStorage.setItem("profilePhoto", reader.result);
        profilePhoto.src = reader.result;

    });

    //se coloca un método readAsDataURL() a reader, usado para leer el archivo (files[0]) y representar
    // la información como una cadera de caracteres
    reader.readAsDataURL(this.files[0]);

});


document.addEventListener("DOMContentLoaded", (e) => {

    //Código para agregar datos de usuario.
    //Traigo los dos items del localStorage
    let user = localStorage.getItem("user");
    let fullUser = localStorage.getItem("fullUser")

    //Si el usuario es 'full' (ingreso más datos de los iniciales) traigo la info del localstorage
    // la recorro y la coloco en los campos

    if (fullUser) {

        let fullUserData = [];
        fullUserData.push(JSON.parse(fullUser));

        for (let data of fullUserData) {

            inputFirstName.value = data.firstName
            inputSecondName.value = data.secondName
            inputFirstSurname.value = data.firstSurname
            inputSecondSurname.value = data.secondSurname
            inputEmail.value = data.email
            inputPhoneNum.value = data.phoneNum
        };
    }

    //Si el usuario no es 'full', y si es usuario, colocamos el dato email en su respectivo campo
    if (!fullUser && user) {
        inputEmail.value = user
    };

    //Código para mostrar imagen de perfil
    //Traigo item de localStorage
    let profilePhotoStorage = localStorage.getItem("profilePhoto");
    //Si el item existe, reemplazo la foto de perfil por defecto por la guardada en el localStorage
    if (profilePhotoStorage) {
        profilePhoto.src = profilePhotoStorage;
    };

});

//Nombre de usuario en menu desplegable superior
document.getElementById("nombreUsuarioPro").innerHTML = (localStorage.getItem("user"));
