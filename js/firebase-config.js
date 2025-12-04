/* ============================================
   PARAMIND - Firebase Configuration
   ============================================ */

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC01FaWpNvJQ_LyXYBUx3Z5L2BYRrCNOUE",
    authDomain: "paramind-64b8e.firebaseapp.com",
    projectId: "paramind-64b8e",
    storageBucket: "paramind-64b8e.firebasestorage.app",
    messagingSenderId: "452173393964",
    appId: "1:452173393964:web:8599c0fe1983a6f441e189",
    measurementId: "G-GW385S6L0L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Initialize Firestore with Safari fix
// Safari blocks WebChannel, so we force long polling
const db = firebase.firestore();

// Force long polling for Safari compatibility
db.settings({
    experimentalForceLongPolling: true
});

// Export for use in other files
window.firebaseAuth = auth;
window.firebaseDb = db;

console.log('Firebase initialized successfully');
