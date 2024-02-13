require('dotenv').config();
const { Vonage }  = require('@vonage/server-sdk');
const WaveFile = require('wavefile').WaveFile;
const bodyParser = require('body-parser');

const express = require('express');
const path = require('path');
const fs = require('fs');
const { NCCOBuilder, Talk, OutboundCallWithNCCO } = require('@vonage/voice')
const app = express();
const expressWs = require('express-ws')(app);
app.use(bodyParser.json());
app.enable('trust proxy')
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
function chunkArray(array, chunkSize) {
  var chunkedArray = [];
  for (var i = 0; i < array.length; i += chunkSize)
      chunkedArray.push(array.slice(i, i + chunkSize));
  return chunkedArray;
}
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
   console.log(req,"req.body.status")
   res.send(200);
})
  app.get('/webhooks/answer', (req, res) => {
    // console.log(req.body,'req.body')
    // const number = req.body.from.split('').join(' ');
    console.log(req?.body,req?.params,req?.query)
    let nccoResponse = [
      {
          "action": "talk",
          "text": "Please wait while we connect you to the echo server"
      },
      {
          "action": "connect",
          "from": "NexmoTest",
          "endpoint": [
              {
                  "type": "websocket",
                  "uri": `wss://${req.hostname}/socket`,
                  "content-type": "audio/l16;rate=16000",
              }
          ]
      }
  ]

    console.log("call comming,.....")
    res.status(200).json(nccoResponse);
  });  
  expressWs.getWss().on('connection', function (ws) {
    console.log('Websocket connection is open');
  });
  app.ws('/socket', (ws, req) => {
    const wav = new WaveFile(fs.readFileSync("./sound.wav"));
    wav.toSampleRate(16000);
    wav.toBitDepth("16");

    const samples = chunkArray(wav.getSamples()[0], 320);
    for (var index = 0; index < samples.length; ++index) {
        ws.send(Uint16Array.from(samples[index]).buffer);
    }
})
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