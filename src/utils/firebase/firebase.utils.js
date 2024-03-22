import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeOFNMsRASKoNSDmievpAcHjo3Dwgc0So",
    authDomain: "crwn-clothing-db-b6636.firebaseapp.com",
    projectId: "crwn-clothing-db-b6636",
    storageBucket: "crwn-clothing-db-b6636.appspot.com",
    messagingSenderId: "763064187680",
    appId: "1:763064187680:web:efe62355d0b064ed0b3545"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({

    prompt: "select_account"
  })

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore()
export const createDocFromAuth = async (userAuth, additionalInformation={}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch(err){
            console.log("error creating user", err.message)
        }
    }

    return userDocRef;

}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}