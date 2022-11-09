const email = document.getElementById("email");
const password = document.getElementById("password");
const ingresarButton = document.getElementById("ingresar");
const alertEmail = document.getElementById("alertEmail")

ingresarButton.addEventListener("click", (e) => {
    if (email.value === '') {
        e.preventDefault();
        document.getElementById("errorEmail").classList.remove("d-none");
    }
    if (password.value === '') {
        e.preventDefault();
        document.getElementById("errorContra").classList.remove("d-none")
    }

    else {
        window.location.href = 'main.html'
    };

    if (email.value) {
        localStorage.setItem("user", email.value)
    };

});