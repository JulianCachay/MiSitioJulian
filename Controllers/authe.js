// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { firebaseConfig } from "../firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
});

document.getElementById('google-login').addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
});

document.getElementById('facebook-login').addEventListener('click', () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
});
