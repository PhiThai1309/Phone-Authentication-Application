// server/index.js
const accountSid = "AC83d2ed5f08a87a5f8874874da50788d0";
const authToken = "cb5afc108acc101d4daf1f44912a80c3";
const serviceId = "VA522500fdcd62e054712a7ef26400d5c0";
const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

const express = require("express");
var cors = require("cors");
// const admin = require("firebase-admin");
const db = require("../firebase");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server! My name is Phi Thai" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post("/code/:to", async (req, res) => {
  const phone = req.params.to;

  // client.verify
  //   .services(serviceId)
  //   .verifications.create({ to, channel: "sms" })
  //   .then((verification) => {
  //     res.json(verification);
  //   })
  //   .catch((err) => {
  //     res.json(err);
  //   });

  //6 ditgit access code
  const accessCode = Math.floor(Math.random() * 1000000);

  console.log(phone);

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

  const id = Math.random().toString();
  const entryObject = {
    id: phone,
    phoneNo: phone,
    accessCode: accessCode,
  };

  db.collection("users")
    .doc(phone)
    .set(entryObject)
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});

app.post("/check/:to/:code", async (req, res) => {
  const phone = req.params.to;
  const code = req.params.code;

  const verifiedPhone = {
    id: phone,
    phoneNo: phone,
    accessCode: "",
  };

  db.collection("users")
    .doc(phone)
    .get()
    .then((doc) => {
      console.log(doc.data());
      console.log(code);
      if (doc.data().accessCode.toString() === code.toString()) {
        console.log("Document data:", doc.data());
        db.collection("users")
          .doc(phone)
          .set(verifiedPhone)
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        res.json({ check: true });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        res.json({ check: false });
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  // ref.once(phone, (data) => {
  //   data.accessCode === code;
  //   res.json({ check: true });
  // });
  // client.verify
  //   .services(serviceId)
  //   .verificationChecks.create({ to, code })
  //   .then((verification) => {
  //     res.json(verification);
  //   })
  //   .catch((err) => {
  //     res.json(err);
  //   });
});
