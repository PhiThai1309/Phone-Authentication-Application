import React, { useState } from "react";
import "./LoginInput.css";

const BaseURL = "http://localhost:8000";

const LoginInput = () => {
  const [phone, setPhone] = useState("");
  const [verfication, setVerfication] = useState("");

  const phoneInputHandler = (event) => {
    setPhone(event.target.value);
    console.log(phone);
  };

  const verifcationInputHandler = (event) => {
    setVerfication(event.target.value);
    console.log(verfication);
  };

  // Send verfication code to phone number function
  const sendCode = (event) => {
    event.preventDefault();
    //Fetch response from server
    fetch(`${BaseURL}/code/${phone}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "sent") {
          alert("Code sent");
        }
      })
      .catch((err) => {
        alert("Error sending code");
      });
  };

  //verify the access code function
  const verifyCode = (event) => {
    event.preventDefault();

    //Check if the phone number and access code are not empty
    if (phone.length !== 0 && verfication.length === 6) {
      // Now check if the verfication inserted was the same as
      // the one sent
      console.log(`${BaseURL}/check/${"" + phone}/${verfication}`);
      fetch(`${BaseURL}/check/${phone}/${verfication}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.check) {
            alert("Phone Verfied");
          } else {
            alert("Verfication failed try again!!");
          }
        });
    } else if (verfication.length < 6) {
      // If the access code is less than 6 digits
      alert("Please enter a valid access code");
    } else {
      // If the phone number or access code is empty
      alert("Please enter both phone number and access code");
      return;
    }
  };
  return (
    <form>
      <h1>Login Application</h1>
      {/* This is the code for the input field of phone number */}
      <div>
        <h3>Enter your phone number</h3>
        <div id="subText">
          Please note that the phone number must include the contry code at the
          beginning e.g. +84879422913
        </div>
        <input
          type="text"
          onChange={phoneInputHandler}
          placeholder="Phone number"
        />
        <button onClick={sendCode}>Get a code</button>
      </div>

      {/* This is the code for the input field of code */}
      <div>
        <h3>Enter the code</h3>
        <input
          type="text"
          placeholder="Code"
          onChange={verifcationInputHandler}
        />
        <button type="submit" onClick={verifyCode}>
          Verify
        </button>
      </div>
    </form>
  );
};

export default LoginInput;
