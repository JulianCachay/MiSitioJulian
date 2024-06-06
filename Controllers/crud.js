
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { firebaseConfig } from "../firebase-config.js";

// Iniialazar firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('add-car-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;

    try {
        await addDoc(collection(db, "cars"), {
            make,
            model,
            year
        });
        alert("Carro agregado exitosamente");
        loadCars();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

async function loadCars() {
    const carList = document.getElementById('car-list');
    carList.innerHTML = '';
    const querySnapshot = await getDocs(collection(db, "cars"));
    querySnapshot.forEach((doc) => {
        const car = doc.data();
        const li = document.createElement('li');
        li.textContent = `${car.make} ${car.model} (${car.year})`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener('click', async () => {
            await deleteDoc(doc(db, "cars", doc.id));
            loadCars();
        });
        li.appendChild(deleteButton);
        carList.appendChild(li);
    });
}

//importar carros
loadCars();
