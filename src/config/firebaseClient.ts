import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import dotenv from 'dotenv';

dotenv.config();

const firebaseClientApp = firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
});

export const authClient = firebase.auth();
