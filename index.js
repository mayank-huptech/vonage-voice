require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.get('/webhooks/events', (req, res) => {
  // console.log(req.query, "/webhooks/events")
  res.status(200)
})
app.get('/webhooks/answer', (req, res) => {
  let nccoResponse = [
    {
      action: "talk",
      text: "This call is being directed from Best Cataract Surgeons in America"
    },
    {
      action: "connect",
      from: process.env.VONAGE_NUMBER,
      endpoint: [
        {
          type: "phone",
          number: process.env.PROXY_NUMBER,
        }
      ]
    }
  ]
  res.status(200).json(nccoResponse)
});

app.get("/webhooks/fallback", (req, res) => {
  // console.log(req?.query, "/webhooks/fallback")
})

app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));