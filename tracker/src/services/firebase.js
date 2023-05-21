import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider, updateProfile} from "firebase/auth"
import { getDownloadURL, getStorage,ref,uploadBytes} from "firebase/storage"


//turin profile
const firebaseConfig = {
  apiKey: "AIzaSyDVZEjFbpPWKYsGkxJcvRW4pUlNKTqsaM4",
  authDomain: "tracker-46d44.firebaseapp.com",
  projectId: "tracker-46d44",
  storageBucket: "tracker-46d44.appspot.com",
  messagingSenderId: "707139540702",
  appId: "1:707139540702:web:6debbd0f5d6e772b77944f"
};

//betiprofile
// const firebaseConfig = {
//   apiKey: "AIzaSyBCbKKrqD1FzpP0EX9d9tFdMIlzfdvYy38",
//   authDomain: "anotherfitness-9da5d.firebaseapp.com",
//   projectId: "anotherfitness-9da5d",
//   storageBucket: "anotherfitness-9da5d.appspot.com",
//   messagingSenderId: "173977706291",
//   appId: "1:173977706291:web:4f1958c4cd868fa48fe846",
//   measurementId: "G-GGX6VCXD90"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
const storage = getStorage()

export async function uploadPhoto(file, currentUser) {
  const fileRef = ref(storage, currentUser,+".png")
  const snapshot = await uploadBytes(fileRef, file)
  const photoURL = await getDownloadURL(fileRef)
  const changeAvatar = await updateProfile(auth.currentUser, {photoURL: photoURL})
}