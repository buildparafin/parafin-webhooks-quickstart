const express = require('express');
const crypto = require('crypto');
require('dotenv').config();
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

var app = express();

app.use(require('body-parser').json());
app.use(require('express-session')({ secret: 'unique-secret', resave: false, saveUninitialized: false }));

app.post('/parafin-webhook-handler', async function(req, res) { 
  const signature = req.headers["x-signature"];
  const body = req.body

  // calculate the signature
  const expectedSignature = crypto.createHmac("sha256", WEBHOOK_SECRET)
    .update(JSON.stringify(body))
    .digest("hex");

  // compare the signature against the one in the request
  if (signature !== expectedSignature) {
    throw new Error("Invalid signature.");
  }

  // handle the event
  switch (body.event) {
    case "flex_loan_offer_created":
      // handle flex loan offer created
      break;
    case "flex_loan_offer_accepted":
      // handle flex loan offer accepted
      break;
    case "flex_loan_closed":
      // handle flex loan closed
      break;      
    // ... handle other event types
    default:      
      break;
  }

  res.sendStatus(200)
});


//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Getting served on port ' + PORT);
  }
});
