import admin from 'firebase-admin';

try {
    const serviceAccount = require("./key/cheaprice-co-key.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://cheaprice-io.firebaseio.com"
    });
} catch(err) {
     console.error('Firebase admin initialization error', err.stack);
}

export default admin.firestore();