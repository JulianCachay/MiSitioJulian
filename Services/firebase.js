import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

//auth
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    sendSignInLinkToEmail,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    sendPasswordResetEmail,
    deleteUser
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

//firebase storage
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js"

//firestore
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";


 const firebaseConfig = {
    apiKey: "AIzaSyCoCBQXRs7JrndA7ofslPUF1ycYdaUBsFo",
    authDomain: "login-b2ae0.firebaseapp.com",
    databaseURL: "https://login-b2ae0-default-rtdb.firebaseio.com",
    projectId: "login-b2ae0",
    storageBucket: "login-b2ae0.appspot.com",
    messagingSenderId: "695389052915",
    appId: "1:695389052915:web:7289a81e29b73298547c86",
    measurementId: "G-W1Q3LXCS9T"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const user = auth.currentUser;
export const db = getFirestore(app);

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

//-----------------------------------------------------------------------------------------
//Metodos autenticacion firebase

const storage = getStorage(app)


// Iniciando con Facebook
export const popup_facebook = () =>
    signInWithPopup(auth, providerFacebook)
        .then((result) => {
            const user = result.user;

            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            return accessToken;
        })
        .catch((error) => {
            console.error("Error al iniciar sesión con Facebook:", error);

            let errorMessage;
            switch (error.code) {
                case "auth/account-exists-with-different-credential":
                    alert("Ya existe una cuenta asociada con este correo electrónico. Por favor, inicia sesión con otro método.");
                    break;
                default:
                    errorMessage = "Error al iniciar sesión con Facebook. Por favor, inténtalo de nuevo más tarde.";
                    break;
            }
            throw new Error(errorMessage);
        });


//iniciando y registrandose con google
export const popup = () => {
    return signInWithPopup(auth, providerGoogle)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            return user; // Devolver el usuario después de iniciar sesión
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            throw error; // Re-lanzar el error para manejarlo en el código que llama a esta función
        });
};

//enviar correo verificacion registro
const actionCodeSettings = {
    url: 'https://terfess0.github.io/ApiWebNube/index.html',
    handleCodeInApp: true
}

export const enviarCorreoVerifi = (email) =>
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            alert("Correo de verificación enviado correctamente.")
        })
        .catch((error) => {
            const errorCode = error.code
            console.log(errorCode)
            const errorMessage = error.message
            alert("Error al enviar el correo de verificación: " + errorMessage)
        })

//metodo de autenticacion de usuario
export const login_auth = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

//cerrar sesion del usuario
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

//registro
export const registerauth = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)

//recuperar contraseña
export const recovery_pass = (email) =>
    sendPasswordResetEmail(auth, email)

//eliminar usuario (usuario)
export const delete_account = () =>
    deleteUser(getAuth().currentUser)


//recovery usuario en home (logeado)
export const recoveryUserLog = () =>
    sendPasswordResetEmail(auth, getAuth().currentUser.email)

// Función para obtener el correo electrónico del usuario actual de manera asíncrona
export const getUserEmail = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user.email);
            } else {
                reject('No hay usuario autenticado');
            }
        });
    });
};
//-----------------------------------------------------------------------------------------
//Metodos database con firestore

export const addProduct = (codigo, nombre, descripcion, cant, email) =>
    addDoc(collection(db, "productos"), {
        codigo: codigo,
        nombre: nombre,
        descripcion: descripcion,
        cantidad: cant,
        ownerEmail: email
    })

export const addDataUser = (identi, name, birthdate, dir, tel, email) =>
    addDoc(collection(db, "users"), {
        userIdentification: identi,
        userName: name,
        userBirthDate: birthdate,
        userDirection: dir,
        userPhone: tel,
        userEmail: email
    })

//getters
export const getDataProducts = () =>
    getDocs(collection(db, "productos"))


export const getDataUsers = () =>
    getDocs(collection(db, "users"))


//eliminar informacion de usuario (admin)
export const getDocUser = (email) =>
    getDocs(query(collection(db, "users"), where("userEmail", "==", email)))

//editar informacion de usuario (admin)
export const updateUserInfo = (doce, updateData) => {
    updateDoc(doc(db, "users", doce), updateData)
}



export const deleteDataUser = (idDoc) =>
    deleteDoc(doc(db, "users", idDoc))

export const addImgProductoStorage = (file, randomName) => {
    const productoRef = ref(storage, 'imagenes/' + randomName)
    return uploadBytes(productoRef, file).then((snapshot) => {
      return getDownloadURL(snapshot.ref)
    })
  }
   export const addProducto = (t, d, p, c, i) =>
    addDoc(collection(db, "productos"), {
      titulo: t,
      descripcion: d,
      precio: p,
      cantidad: c,
      imagen: i
    })

