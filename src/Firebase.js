// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged 
} from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// const analytics = getAnalytics(app);

//  sign up function
export async function signUp(name, email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  await sendEmailVerification(userCredential.user);
  return userCredential.user;
}
 
// login function
export async function login(email,password){
const userCredential = signInWithEmailAndPassword(auth,email,password)
return (await userCredential).user
}

// sign up with googgle

export async function signInWithGoogle(){
const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt:"select_account"
})
const userCredential = await signInWithPopup(auth, provider);
return userCredential.user;
}

// logout
export async function logout(){
    await signOut(auth)

}

// resend verification email
export async function resendVerificationEmail(){
    if (auth.currentUser){
        await sendEmailVerification(auth.currentUser)
    }
}

// check if email is verified
export async function isEmailVerified(){
    await auth.currentUser.reload()
    return auth.currentUser.emailVerified
}

// listen to auth state changes
export function onAuthStateChangedListener(callback){
    onAuthStateChanged(auth, callback)
}