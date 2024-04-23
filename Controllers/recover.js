import { recovery } from "/Controllers/firebase.js"

const event = document.getElementById("recover_btn")

async function recuperar() {
    const email = document.getElementById('emailRe').value

    if (email === "") {
        alert("Debe ingresar un correo en el campo")
        return 1;

    } else if (email.indexOf("@") === -1) {
        alert("El correo electrónico no es válido, use uno real")
        return 1;
    }

    const verificar = recovery(email)
    const validation = await verificar

        .then((validation) => {
            alert("Correo de recuperación enviado a " + email + ".")
            window.location.href = "../index.html"
        })
        .catch((error) => {
            switch (error.code) {
                case "auth/invalid-email":
                    alert("El correo electrónico proporcionado no es válido.");
                    break;
                case "auth/user-not-found":
                    alert("No hay ningún usuario registrado con este correo electrónico.");
                    break;
                default:
                    console.error("Error al enviar el correo de recuperación:", error);
                    alert("Ocurrió un error al enviar el correo de recuperación. Por favor, inténtalo de nuevo más tarde.");
                    break;

            }
        })

}

window.addEventListener('DOMContentLoaded', async () => {
    event.addEventListener('click', recuperar)
})