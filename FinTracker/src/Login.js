import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCgzrkGNVam9Bn3V0zFs37mydEgmq_N2mw",
  authDomain: "fintracker-5964c.firebaseapp.com",
  projectId: "fintracker-5964c",
  storageBucket: "fintracker-5964c.appspot.com",
  messagingSenderId: "527418653498",
  appId: "1:527418653498:web:3123822d839a77351bae03"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const btn = document.getElementById("btn");

btn.addEventListener("click", (event) => {
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.href = "profile.html";
      alert("Successfully logged in!");
    })
    .catch((error) => {
      alert(error.message);
    });
});
