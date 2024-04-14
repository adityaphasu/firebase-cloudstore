/* === Imports === */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/* === Firebase Setup === */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

console.log(db);

/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view");
const viewLoggedIn = document.getElementById("logged-in-view");

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn");

const emailInputEl = document.getElementById("email-input");
const passwordInputEl = document.getElementById("password-input");

const signInButtonEl = document.getElementById("sign-in-btn");
const createAccountButtonEl = document.getElementById("create-account-btn");

const signOutButtonEl = document.getElementById("sign-out-btn");

const userProfilePictureEl = document.getElementById("user-profile-picture");
const userGreetingEl = document.getElementById("user-greeting");

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle);

signInButtonEl.addEventListener("click", authSignInWithEmail);
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail);
signOutButtonEl.addEventListener("click", authSignOut);

/* === Main Code === */

onAuthStateChanged(auth, (user) => {
  if (user) {
    showLoggedInView();
    showProfilePicture(userProfilePictureEl, user);
    showUserGreeting(userGreetingEl, user);
  } else {
    showLoggedOutView();
  }
});

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {})
    .catch((error) => {
      console.error(error.message);
    });
}

function authSignInWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      clearAuthFields();
    })
    .catch((error) => {
      console.error(error);
    });
}

function authCreateAccountWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      clearAuthFields();
    })
    .catch((error) => {
      console.log(error);
    });
}

function authSignOut() {
  signOut(auth)
    .then(() => {
      clearAuthFields();
    })
    .catch((error) => {
      console.log(error);
    });
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
  hideView(viewLoggedIn);
  showView(viewLoggedOut);
}

function showLoggedInView() {
  hideView(viewLoggedOut);
  showView(viewLoggedIn);
}

function showView(view) {
  view.style.display = "flex";
}

function hideView(view) {
  view.style.display = "none";
}

function clearInputField(field) {
  field.value = "";
}

function clearAuthFields() {
  clearInputField(emailInputEl);
  clearInputField(passwordInputEl);
}

function showProfilePicture(imgElement, user) {
  const photoURL = user.photoURL;

  if (photoURL) {
    imgElement.src = photoURL;
  } else {
    imgElement.src = "/assets/images/default-profile-picture.jpeg";
  }
}

function showUserGreeting(element, user) {
  const displayName = user.displayName;

  if (displayName) {
    element.textContent = `Hey ${displayName.split(" ")[0]}, how are you?`;
  } else {
    element.textContent = "Hey friend, how are you?";
  }
}
