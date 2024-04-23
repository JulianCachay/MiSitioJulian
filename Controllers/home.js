import { userState, log_out, borrar_account } from "../Controllers/firebase.js";

userState()

const sesion = document.getElementById('btn_logout')

async function cerrarSesion(){
    const verificacion = log_out()
    const comprobar = await verificacion

    .then((comprobar) =>{
        alert("Sesion cerrada")
        window.location.href = '../index.html'
    })
    .catch((error) => {
        alert('Sesion no creada')
    })
}

window.addEventListener('DOMContentLoaded', async() =>{
    sesion.addEventListener('click', cerrarSesion)
})

const btn_borrar_cuenta = document.getElementById("borrar_cuenta_btn")

btn_borrar_cuenta.addEventListener('click', async () => {
    try {
        const result = await borrar_account();
        const user = result.user;
        alert("Cuenta borrada. Adios")
        window.location.href = '../index.html'
    } catch (error) {
        alert('Algo salio mal, parece que te quedas un poco mas.');
    }
});