// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyA6rmbCDA6IzKS3wbeYMAeekDDoa_K1_IY',
  authDomain: 'nebo-brew.firebaseapp.com',
  projectId: 'nebo-brew',
  storageBucket: 'nebo-brew.appspot.com',
  messagingSenderId: '439978098905',
  appId: '1:439978098905:web:4b99987bb0a9856c9bfec8',
  measurementId: 'G-0TC0H4373M',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
