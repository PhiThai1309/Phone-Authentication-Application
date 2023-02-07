var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://phone-number-authenticat-ec57c-default-rtdb.firebaseio.com",
});

let db = admin.firestore();

module.exports = db;
