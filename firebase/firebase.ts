// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

const fbApp = initializeApp(firebaseConfig);

export const db = getFirestore(fbApp);

export const quotesRef = collection(db, "quotes");
export const quoteCollectionName = "quotes";

// // get collection data
// let quotesArray = [];
// getDocs(quotesRef)
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       quotesArray.push({ ...doc.data(), id: doc.id });
//     });
//     console.log("Quotes from Firestore", quotesArray);
//   })
//   .catch((e) => console.log("error getting snapshot", e));

//--- ADD DOC
// addDoc(quotesRef, {
//   author: "Mark McCoid",
//   quote: "What I say is a quote",
//   authorBio: "This is the Bio",
//   // an array of tags or a comma delimited ,of tags
//   tags: ["Truth"],
//   rating: 1,
//   createDate: "09-24-2022",
// });
//--- DELETE DOC
// const docRef = doc(db, "quotes", idOfDoc);
// deleteDoc(docRef).then(() => console.log("successful delete"));

// export const quotes = quotesArray;
