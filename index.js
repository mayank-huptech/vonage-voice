require('dotenv').config();
const { Vonage }  = require('@vonage/server-sdk');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.enable('trust proxy')
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// const privatePath=path.resolve(__dirname,process.env.VONAGE_PRIVATE_KEY_PATH)
// var privateKey = fs.readFileSync(privatePath, 'utf8');
// const credentials = {
//   apiKey: process.env.VONAGE_API_KEY,
//   apiSecret: process.env.VONAGE_API_SECRET,
//   applicationId: process.env.VONAGE_APPLICATION_ID,
//   privateKey: privateKey
// };
// const options = {debug: true};
// const vonage = new Vonage(credentials, options);

// const ANSWER_URL = 'https://raw.githubusercontent.com/nexmo-community/ncco-examples/gh-pages/text-to-speech.json'


console.log("wdwddwdwdwdwd")
app.get('/webhooks/events', (req, res) => {
   console.log(req.query,"/webhooks/events")
   let nccoResponse = [
    {
        action: "talk",
        text: "Please wait while we connect you to the echo server"
    }
]
  console.log("/webhooks/events")
  res.status(200).json(nccoResponse);
})
app.get('/webhooks/answer', (req, res) => {
    console.log(req?.query,"/webhooks/answer")
    const {to,from}=req?.query
    console.log(to,from,"wddwd")
    let nccoResponse = [
      {
          action: "talk",
          text: "Hello mayank is bussy right now please wait for sometime. or mayank will get back later"
      },
      {
        action: "connect",
        timeout: 1000,
        from: from,
        endpoint: [
          {
            type: "phone",
            number: to,
          }
        ]
      }
   
  ]
    console.log(" /webhooks/answer call comming,.....")
    res.status(200).json(nccoResponse);
  });  

  app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));