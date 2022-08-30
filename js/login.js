const email = document.getElementById("email");
const contraseña = document.getElementById("password");
const ingresar = document.getElementById("ingresar");
const alertEmail = document.getElementById("alertEmail")

ingresar.addEventListener("click", (e) => {
    if (email.value === '') 
    { e.preventDefault();
    document.getElementById("errorEmail").classList.remove("d-none");
    }
    if (contraseña.value === '') {
        e.preventDefault();
    document.getElementById("errorContra").classList.remove("d-none")
    }

    else {
    window.location.href='main.html'
    }
})

ingresar.addEventListener("click", (e) =>{
if (email.value) {
    localStorage.setItem("usuario", email.value)
}
})
