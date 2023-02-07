import React, { useState } from "react";
import "./LoginInput.css";

const BaseURL = "http://192.168.1.6:8000";

const LoginInput = () => {
  const [phone, setPhone] = useState("");
  const [verfication, setVerfication] = useState("");
  const [checkedNumber, setCheckedNumber] = useState("");

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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "pending") {
          setCheckedNumber(phone);
        } else if (res.status === "approved") {
          console.log("approved");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyCode = (event) => {
    event.preventDefault();
    // Now check if the verfication inserted was the same as
    // the one sent
    console.log(checkedNumber);
    console.log(`${BaseURL}/check/${"" + phone}/${verfication}`);
    fetch(`${BaseURL}/check/${phone}/${verfication}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "approved") {
          alert("Phone Verfied");
        } else {
          // Handle other error cases like network connection problems
          alert("Verfication failed try again!!");
        }
      });
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