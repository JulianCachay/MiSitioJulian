import { registerauth, enviarCorreoVerifi, addDataUser } from "../Services/firebase.js"

const save_auth = document.getElementById('btn_register')

async function register() {
  
    if (window.verificado === true) {
        const emailInput = document.getElementById('emailR').value
        const contraseñaInput = document.getElementById('contraseñaR').value

        //datos user to firebase
        const ident = document.getElementById("identR").value
        const name = document.getElementById("nameR").value
        const birthdate = document.getElementById("dateR").value
        const dir = document.getElementById("direccionR").value
        const tel = document.getElementById("telR").value

        try {
            await enviarCorreoVerifi(emailInput)
            const verificar = await registerauth(emailInput, contraseñaInput)
            alert("El usuario se registró exitosamente.")
            await addDataUser(ident, name, birthdate, dir, tel, emailInput)
            alert("Los datos de usuario se guardaron.")

            window.location.href = "../Templates/verify_mail.html"

        } catch (error) {
            document.getElementById("btn_register").innerText = "Registrate";
            if (error.code === 'auth/email-already-in-use') {
                alert("Este correo electrónico ya está en uso. Por favor, utiliza otro.")
            } else if (error.code === 'auth/invalid-email') {
                alert("Correo inválido, sigue el formato: ejemplo@example.com")
            } else {
                alert("Hubo un error, intenta de nuevo más tarde.")
                console.error(error)
            }
        }
    }

    if (window.adm_verificado === true) {
        const emailInput = document.getElementById('emailRA')
        const contraseñaInput = document.getElementById('contraseñaRA')

        // Datos de usuario para Firebase
        const ident = document.getElementById("identRA")
        const name = document.getElementById("nameRA")
        const birthdate = document.getElementById("dateRA")
        const dir = document.getElementById("direccionRA")
        const tel = document.getElementById("telRA")

        try {
            const verificar = await registerauth(emailInput.value, contraseñaInput.value)
            alert("El usuario se registró exitosamente.")
            await addDataUser(ident.value, name.value, birthdate.value, dir.value, tel.value, emailInput.value)
            alert("Los datos de usuario se guardaron.")

            // Limpiar campos
            emailInput.value = ""
            contraseñaInput.value = ""
            ident.value = ""
            name.value = ""
            birthdate.value = ""
            dir.value = ""
            tel.value = ""

            var modal = document.getElementById("modalNewUser")
            modal.style.display = "none"

            document.getElementById("btn_register").innerText = "Guardar"

        } catch (error) {
            document.getElementById("btn_register").innerText = "Registrate";
            if (error.code === 'auth/email-already-in-use') {
                alert("Este correo electrónico ya está en uso. Por favor, utiliza otro.")
            } else if (error.code === 'auth/invalid-email') {
                alert("Correo inválido, sigue el formato: ejemplo@example.com")
            } else {
                alert("Hubo un error, intenta de nuevo más tarde.")
                console.error(error)
            }

            var modal = document.getElementById("modalNewUser")
            modal.style.display = "none"
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    save_auth.addEventListener('click', register);
});