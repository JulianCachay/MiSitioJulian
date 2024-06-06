// Importar las funciones necesarias desde los SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { firebaseConfig } from "../firebase-config.js";

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('formulario-agregar-carro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const año = document.getElementById('año').value;

    try {
        await addDoc(collection(db, "carros"), {
            marca,
            modelo,
            año
        });
        alert("Carro agregado exitosamente");
        cargarCarros();
    } catch (e) {
        console.error("Error al agregar documento: ", e);
    }
});

async function cargarCarros() {
    const listaCarros = document.getElementById('lista-carros');
    listaCarros.innerHTML = '';
    const querySnapshot = await getDocs(collection(db, "carros"));
    querySnapshot.forEach((documento) => {
        const carro = documento.data();
        const li = document.createElement('li');
        li.textContent = `${carro.marca} ${carro.modelo} (${carro.año})`;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener('click', async () => {
            await deleteDoc(doc(db, "carros", documento.id));
            cargarCarros();
        });
        li.appendChild(botonEliminar);
        listaCarros.appendChild(li);
    });
}

// Cargar carros al cargar la página
cargarCarros();
