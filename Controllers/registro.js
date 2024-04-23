import { registerauth, popup_facebook, popup_google } from "../Controllers/firebase.js"

const registrar = document.getElementById('registro_btn')


async function register() {
    var email = document.getElementById("correo").value;
    var emailConfirm = document.getElementById("confirmar_correo").value;
    var contraseña = document.getElementById("contraseña").value;
    var contraseñaConfirm = document.getElementById("confirmar_contraseña").value;
    var error = "";
    var errorElem = document.getElementById("error");

    error = "";
    errorElem.innerHTML = error;

    if (email === "" || emailConfirm === "" || contraseña === "" || contraseñaConfirm === "") {
        error += "Todos los campos son obligatorios.<br>";
    } else if (email.indexOf("@") === -1) {
        error += "Correo electrónico no es válido (Use el nombre@extension.com)<br>";
    } else if (email !== emailConfirm) {
        error += "Los correos electrónicos no coinciden.<br>";
    }
    else if (contraseña.length < 8 || contraseñaConfirm.length < 8) {
        error += "La contraseña debe tener al menos 8 caracteres.<br>";
    }
    else if (contraseña !== contraseñaConfirm) {
        error += "Las contraseñas no coinciden.<br>";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z!@#$%^&*()_+]{8,}/.test(contraseña)) {
        errorContra += "La contraseña debe contener al menos una mayúscula, una minúscula y un caracter especial.<br>";
    }


    // Si hay errores, mostrar los mensajes y evitar el envío del formulario

    if (error !== "") {
        errorElem.innerHTML = error;

    } else {
        const email = document.getElementById('correo').value
        const contraseca = document.getElementById('contraseña').value

        const validar = registerauth(email, contraseca)
        const verificar = await validar

            .then((verificar) => {
                alert("El usuario se registro")
                const user = verificar.user;
                window.location.href = "../index.html"
            })

            .catch((error) => {
                alert("Hubo un error, intenta de nuevo.")
                console.error(error)
            })
    }
}


window.addEventListener('DOMContentLoaded', () => {
    registrar.addEventListener('click', register);
});


const facbt = document.getElementById("facebook_reg");

facbt.addEventListener('click', async () => {
    try {
        const result = await popup_facebook();
        const user = result.user;
        alert('Autenticado' + user.email);
        window.location.href = 'Templates/home.html';
    } catch (error) {
        alert('Error, prueba mas tarde');
    }
});


const googleBt = document.getElementById("google_reg");

googleBt.addEventListener('click', async () => {
    try {
        const result = await popup_google();
        const user = result.user;
        alert('Autenticado' + user.email);
        window.location.href = "../Templates/home.html";
    } catch (error) {
        alert('Error, prueba mas tarde');
    }
});

