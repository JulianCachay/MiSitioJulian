// Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

//auth
import {
    getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  deleteUser
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCoCBQXRs7JrndA7ofslPUF1ycYdaUBsFo",
    authDomain: "login-b2ae0.firebaseapp.com",
    projectId: "login-b2ae0",
    storageBucket: "login-b2ae0.appspot.com",
    messagingSenderId: "695389052915",
    appId: "1:695389052915:web:7289a81e29b73298547c86",
    measurementId: "G-W1Q3LXCS9T"
  };

// Initialize
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const user = auth.currentUser;

const provider = new GoogleAuthProvider();

export const popup_google = () => signInWithPopup(auth, provider);

//cerrar sesion
export const log_out = () =>
    signOut(auth)

export const userState = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
        } else {
            window.location.href = "../index.html"
        }
    });
}

//metodo de autenticacion de usuario
export const login_auth = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

//registro
export const registerauth = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)

const providerFacebook = new FacebookAuthProvider();
// Iniciando con Facebook
export const popup_facebook = () =>
    signInWithPopup(auth, providerFacebook)

//enviar correo verificacion registro
const actionCodeSettings = {
    url: 'https://juliancachay.github.io/MiSitioJulian/index.html',
    handleCodeInApp: true
}
export const verificarCorreo = (email) =>
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            alert("Correo de verificación enviado correctamente.")
        })
        .catch((error) => {
            alert("Error al enviar el correo de verificación: " + error)
        })
//borrar

export const borrar_account = () =>
    deleteUser(user.currentUser)
//registro
export const registerMail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)

//recuperar
export const recovery = (email) =>
    sendPasswordResetEmail(auth, email)

