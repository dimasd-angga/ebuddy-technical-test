import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import dotenv from 'dotenv';

dotenv.config();

export const authClient = firebase.auth();
