import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAzyMwxRnqLlQq90_IY_A82AOdLFH2yN1Q",
    authDomain: "crwn-db-c111f.firebaseapp.com",
    databaseURL: "https://crwn-db-c111f.firebaseio.com",
    projectId: "crwn-db-c111f",
    storageBucket: "crwn-db-c111f.appspot.com",
    messagingSenderId: "662683371150",
    appId: "1:662683371150:web:e47d131850d2f98761ebdf",
    measurementId: "G-MDSBZVPNXD"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  console.log(userRef)

  const snapShot = await userRef.get();
  console.log(snapShot)
  
  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log("An error occured while creating the user", error.message())
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();



const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;