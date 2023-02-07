// server/index.js
const accountSid = "AC863a0a5b95003d35d76e8e7efbab6d5c";
const authToken = "478eb08bbd100e69441c74ff8967f316";
const serviceId = "VA636fb26f7ee1abd2c737ec3d8b189b55";
const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

const express = require("express");
var cors = require("cors");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server! My name is Phi Thai" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/code/:to", async (req, res) => {
  const to = req.params.to;

  client.verify
    .services(serviceId)
    .verifications.create({ to, channel: "sms" })
    .then((verification) => {
      res.json(verification);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/check/:to/:code", async (req, res) => {
  const to = req.params.to;
  const code = req.params.code;
  client.verify
    .services(serviceId)
    .verificationChecks.create({ to, code })
    .then((verification) => {
      res.json(verification);
    })
    .catch((err) => {
      res.json(err);
    });
});
