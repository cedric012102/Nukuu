/**
 * @format
 */

 import {AppRegistry} from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';
 import firebase from '@react-native-firebase/app';
 import 'firebase/firestore';
 import {GoogleSignin} from '@react-native-google-signin/google-signin';
 
 const firebaseConfig = {
    apiKey: "AIzaSyB6yKreZQ-IHrqfNVitYtm47Danzrg3vgw",
    authDomain: "nukuu-5ff84.firebaseapp.com",
    projectId: "nukuu-5ff84",
    storageBucket: "nukuu-5ff84.appspot.com",
    messagingSenderId: "461021615139",
    appId: "1:461021615139:web:c0cce02bd26755bea6cd96"
  };
 
 if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
 }
 
 GoogleSignin.configure({
   scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
   webClientId:
     '461021615139-8glso9roguhfh96795s5qiet1re7vaod.apps.googleusercontent.com',
 });
 
 AppRegistry.registerComponent(appName, () => App);
