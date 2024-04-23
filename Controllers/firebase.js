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
    apiKey: "AIzaSyCF1CUE1e_uoP0XhnvifInOiHs1f-rMJJs",
    authDomain: "apiwebmario.firebaseapp.com",
    projectId: "apiwebmario",
    storageBucket: "apiwebmario.appspot.com",
    messagingSenderId: "377429199130",
    appId: "1:377429199130:web:98e9dbb2faaec11a51c4a3",
    measurementId: "G-NJKJND0HXW"
};

// Initialize
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const user = auth.currentUser;

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);

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
    url: 'https://andresabril2005.github.io/ApiParaNube/index.html',
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
    deleteUser(user)
//registro
export const registerMail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)

//recuperar
export const recovery = (email) =>
    sendPasswordResetEmail(auth, email)

