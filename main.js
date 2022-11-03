// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBq79YUJkNCKHq8lCY8qA1YP4ORy5AOyWA",
    authDomain: "chat2022-95998.firebaseapp.com",
    databaseURL: "https://chat2022-95998-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat2022-95998",
    storageBucket: "chat2022-95998.appspot.com",
    messagingSenderId: "102881276407",
    appId: "1:102881276407:web:8a8d002bc1ee6576f33ef2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const loginModal = new bootstrap.Modal('#login-modal')

loginModal.show();


document.querySelector("#login-button").addEventListener("click", function () {
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            console.log(email.slice(0, email.indexOf('@')));
            loginModal.hide()

            initDatabase()
            // ...
        })
        .catch((error) => {
            console.log("error")
        });
})
const db = getDatabase(app);
function initDatabase() {
    // initializes Realtime Database and get a reference service


    // create reference, where in the database we want to take info from
    const chatRef = ref(db, '/chat');


    // listens for database changes
    onChildAdded(chatRef, function (data) {

        // create element and append to list element
        const message = document.createElement("li")
        message.innerText = email.value + ": " + data.val();

        list.appendChild(message)
    })
}
const input = document.querySelector("input");
const list = document.querySelector("ul")

input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {

        // create 'unique' id for message
        const messageId = new Date().toUTCString();

        // send to database
        set(ref(db, "chat/" + messageId), input.value)


        // clear input
        input.value = "";
    }
})