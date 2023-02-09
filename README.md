# Phone Authentication Application
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<p align="center">
<img width="700" alt="image" src="https://user-images.githubusercontent.com/71892904/217709943-bb6ea448-0c8e-4257-938a-9b26644a5e26.png">
</p>

## Table of contents

- [Overview](#overview)
- [Functionalities](#Functionalities)
- [Built with](#built-with)
- [Author](#author)


## Overview

This is a small project that I develop to learn about React JS as well as Node JS and Express JS. This web application will authenticate a phone number by sending a 6 digit access code using SMS service provided by Twilio library and store the access code that is linked with corresponding phone number in Firestore.

### Functionalities

Users should be able to verify a phone number if it is real or not by sending a random generated 6 digit access code through a SMS message to the provided phone number in the application.
<p align="center">
  <img height="100" src="https://user-images.githubusercontent.com/71892904/217709120-86cc6509-4b5b-4ee6-b263-462aff5a7d8a.png" />
 </p>


### Built with

<p align="center">
  <img src="https://skillicons.dev/icons?i=js" />
  <img src="https://skillicons.dev/icons?i=css">
  <img src="https://skillicons.dev/icons?i=react">
  <img src="https://skillicons.dev/icons?i=express">
  <img src="https://skillicons.dev/icons?i=nodejs">
  <img src="https://skillicons.dev/icons?i=firebase">
  <a href="https://www.twilio.com/">
  <img height="45" src="https://user-images.githubusercontent.com/71892904/217313401-0975de41-16c9-49a6-ac4b-3eb4a9b2a855.png">
  </a>
  <img src="https://skillicons.dev/icons?i=postman">
  <img src="https://skillicons.dev/icons?i=vscode">
</p>

- Visual Studio Code
- React JS, CSS
- Express JS & Node JS
- Github & Git
- Firestore database provided by Firebase
- SMS service provided by Twilio

## Setting up the environment
This project include both backend and front end. In the project directory.

Clone this Github project in your preferred IDE (Visual Studio Code). Run this command to install all  the necessary node-module.

```
npm install
```

<p> - <b> For back-end: </b> </p>

- To start the back-end please follow these command:

```
npm start
```

Open [http://localhost:8000](http://localhost:8000) to view it in your browser. The server will reload when you make changes.

<p> - <b> For front-end: </b> </p>

- Please start another terminal beside the terminal that is currently hosting back-end server

- Please locate to folder <b> login-app </b> by using this command:

```
cd login-app
```

- To start the front-end please follow these command:

```
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console. See this link for more details of this error: 
## Limitation

- Twilio API: 
  - Since the application is using a free account from Twilio Message API, there is a limit to how many text message can be sent per day (Error 202429): [https://www.twilio.com/docs/api/errors/20429](https://www.twilio.com/docs/api/errors/20429).
  - The phone number must be in the correct form or else they will have a Error 21211: https://www.twilio.com/docs/api/errors/21211.
  
     ```e.g.: [+] [country code] [subscriber number including area code]```
  - Using a free Twilio account to send a SMS message only limit to a verify phone number. In VietName, this case is only limit to register phone number associate with the corresponding host account. Error 21608: https://www.twilio.com/docs/api/errors/21608.
  - If sending a SMS message throw this error (Error 20003) https://www.twilio.com/docs/api/errors/20003 or any error that is related to permission, please contact me so I can update my authentication token. During development of this project, a authentication token changes many times so if you encountered this error, please let me know.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Author
- Thai Manh Phi: Total contribution: 100%

## References
- https://www.npmjs.com/package/cors
- https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
- https://medium.com/swlh/creating-phone-number-verification-component-using-react-js-and-twilio-services-6a635657ecc9
- https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
- https://www.tutorialspoint.com/expressjs/expressjs_routing.htm
- https://github.com/twilio-labs/function-templates/tree/main/verify
- https://www.twilio.com/docs/sms/send-messages

