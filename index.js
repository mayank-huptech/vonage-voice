require('dotenv').config();
const { Vonage }  = require('@vonage/server-sdk');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const fs = require('fs');
const { NCCOBuilder, Talk, OutboundCallWithNCCO } = require('@vonage/voice')
const app = express();
app.use(bodyParser.json());
app.enable('trust proxy')
app.use(bodyParser.urlencoded({ extended: true }));
// const privatePath=path.resolve(__dirname,process.env.VONAGE_PRIVATE_KEY_PATH)
// var privateKey = fs.readFileSync(privatePath, 'utf8');
// const credentials = {
//     apiKey: process.env.VONAGE_API_KEY,
//     apiSecret: process.env.VONAGE_API_SECRET,
//     applicationId: process.env.VONAGE_APPLICATION_ID,
//     privateKey: privateKey
//   };
//   const options = {debug: true};
//   const vonage = new Vonage(credentials, options);
  
// async function makeCall() {
//     const builder = new NCCOBuilder();
//     builder.addAction(new Talk('This is a text to speech call from Vonage'));
//     const resp = await vonage.voice.createOutboundCall(
//       new OutboundCallWithNCCO(
//         builder.build(),
//         { type: 'phone', number: process.env.TO_NUMBER },
//         { type: 'phone', number: process.env.VONAGE_NUMBER}
//       )
//     );
																																					
//     console.log(resp,"sqsqsq");
//   }
//   makeCall();
console.log("wdwddwdwdwdwd")
app.post('/webhooks/events', (req, res) => {
   console.log(req.body.status,"req.body.status")
  res.status(200).end()
})
  app.get('/webhooks/answer', (req, res) => {
    // console.log(req.body,'req.body')
    // const number = req.body.from.split('').join(' ');
    console.log(req?.body,req?.params,req?.query)
    const ncco = [
      {
        action: 'talk',
        text: 'Thank you for calling to mayank. mayank is available soon as possible '
      },

    ];
    console.log("call comming,.....")
    res.status(200).json(ncco);
  });  

const ANSWER_URL = 'https://raw.githubusercontent.com/nexmo-community/ncco-examples/gh-pages/text-to-speech.json'

// vonage.voice.createOutboundCall({
//   to: [{
//     type: 'phone',
//     number: process.env.TO_NUMBER
//   }],
//   from: {
//     type: 'phone',
//     number: process.env.VONAGE_NUMBER
//   },
//   answer_url: [ANSWER_URL]
// })
//   .then((res)=>{
//     console.log(res,"saqsq")
// //     vonage.voice.getCall(res.uuid)
// //   .then(resp => console.log(resp,"call"))
// //   .catch(err => console.error(err));
//   })
//   .catch(err => console.error(err));

  app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));