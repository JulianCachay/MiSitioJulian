import { login_auth } from "../Controllers/firebase.js";

const clika = document.getElementById("login_btn");

async function validar() {
    const email = document.getElementById('usuario').value;
    const password = document.getElementById('contraseña').value;

    if (email.trim() === '' || password.trim() === '') {
        alert("No pueden haber campos vacios.");
        return;
    }

    try {
        const verification = await login_auth(email, password);

        if (verification != null) {
            alert("Usuario autenticado: " + email);
            window.location.href = "Templates/home.html";
        } else {
            console.log("Sesión " + email + " no validada");
            alert("Credenciales invalidas, usuario y/o contraseña incorrectas.");
        }
    } catch (error) {
        console.error("Error al autenticar:", error);
        alert("Credenciales invalidas, usuario y/o contraseña incorrectas.");
    }
}

window.addEventListener('DOMContentLoaded', () => {
    clika.addEventListener('click', validar);
});
