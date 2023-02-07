// server/index.js
const accountSid = "AC83d2ed5f08a87a5f8874874da50788d0";
const authToken = "cb5afc108acc101d4daf1f44912a80c3";
const serviceId = "VA522500fdcd62e054712a7ef26400d5c0";
const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

const express = require("express");
var cors = require("cors");
const db = require("../firebase");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//Create a post response to send a code to the phone number
app.post("/code/:to", async (req, res) => {
  const phone = req.params.to;

  //6 ditgit access code
  const accessCode = Math.floor(Math.random() * 1000000);

  //Send the code to the phone number using Twilio
  client.messages
    .create({ body: accessCode, from: "+13093003923", to: phone })
    .then((message) => {
      console.log(message.sid);
      res.json({ status: "sent" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "error" });
    });

  //create a random id for the document
  const id = Math.random().toString();

  //create an object to store the phone number and access code
  const entryObject = {
    id: phone,
    phoneNo: phone,
    accessCode: accessCode,
  };

  //store the phone number and access code in firestore
  db.collection("users")
    .doc(phone)
    .set(entryObject)
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});

//Create a post response to check if the code is correct
app.post("/check/:to/:code", async (req, res) => {
  const phone = req.params.to;
  const code = req.params.code;

  //Remove accesscode if the phone is verified
  const verifiedPhone = {
    id: phone,
    phoneNo: phone,
    accessCode: "",
  };

  //Fetch the phone number and access code from firestore
  db.collection("users")
    .doc(phone)
    .get()
    .then((doc) => {
      //Check if the access code is correct and the document exist in FireStore
      if (doc.exists && doc.data().accessCode.toString() === code.toString()) {
        //If the access code is correct remove the access code from the document
        db.collection("users")
          .doc(phone)
          .set(verifiedPhone)
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        res.json({ check: true });
      } else {
        // doc.data() will be undefined in this case
        res.json({ check: false });
      }
    })
    //If there is an error fetching the document
    .catch((error) => {
      console.log("Error getting document:", error);
    });
});
