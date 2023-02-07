import React, { useState } from "react";
import "./LoginInput.css";

const BaseURL = "http://localhost:8000";

const LoginInput = () => {
  const [phone, setPhone] = useState("");
  const [verfication, setVerfication] = useState("");
  // const [checkedNumber, setCheckedNumber] = useState("");

  const phoneInputHandler = (event) => {
    setPhone(event.target.value);
    console.log(phone);
  };

  const verifcationInputHandler = (event) => {
    setVerfication(event.target.value);
    console.log(verfication);
  };

  const sendCode = (event) => {
    event.preventDefault();
    // send verfication code to phone number
    fetch(`${BaseURL}/code/${phone}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "sent") {
          alert("Code sent");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyCode = (event) => {
    event.preventDefault();

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
      alert("Please enter a valid access code");
    } else {
      alert("Please enter both phone number and access code");
      return;
    }
  };
  return (
    <form>
      <h2>Login Application</h2>
      {/* This is the code for the input field of phone number */}
      <div>
        <input
          type="text"
          onChange={phoneInputHandler}
          placeholder="Phone number"
        />
        <button onClick={sendCode}>Confirm to get a code</button>
      </div>

      {/* This is the code for the input field of code */}
      <div>
        <input
          type="text"
          placeholder="Code"
          onChange={verifcationInputHandler}
        />
        <button type="submit" onClick={verifyCode}>
          Confirm to get a code
        </button>
      </div>
    </form>
  );
};

export default LoginInput;
