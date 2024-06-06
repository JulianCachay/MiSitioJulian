import { getDataProducts } from "../Services/firebase.js";

const ver = document.getElementById("vdata");

async function cargar() {
  ver.innerHTML = "";
  const docref = getDataProducts();

  const querySnapshot = await docref;

  querySnapshot.forEach((doc) => {

    ver.innerHTML += `
        <tr>
        
        <td>${doc.data().modelo}</td>
        <td>${doc.data().motor}</td>
        <td>${doc.data().precio}</td>
        </tr>
        `;
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  cargar();
});