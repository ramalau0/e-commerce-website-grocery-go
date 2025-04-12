const express = require("express");
const bodyParser = require( 'body-parser');
const cors = require('cors')
const app = express();
const mysql = require( 'mysql')
//const yoco = require('yoco-node');
const twilio = require('twilio');
require('dotenv').config();
// const mysql = require('mysql');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/get', (req, res) => {
    
    const emails = req.body.emailLog;
    const password = req.body.password;
    var validated = false;
   // console.log(password)

    const sqlSelect = "SELECT * FROM Register WHERE email = ? AND password = ? ";
    db.query (sqlSelect, [emails, password] ,(err, result)=>{
  //  console.log(result)
    res.send(result)
    //result.length !== 0? (res.send(validated = true)) : (res.send(validated = false));
  //  console.log(validated)
    });
})

app.post("/api/insert", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    
    const sqlInsert = "INSERT INTO Register (Email, Password, Phone) VALUES (?,?,?)";
    db.query (sqlInsert,[email, password, phone], (err, result)=>{
    //(result);
    result.length !== 0? (res.send(validated = true)) : (res.send(validated = false));
    });
    
});

app.post("/api/insertOrd", (req, res) => {

    const email = req.body.email;
    const items = req.body.getData;
    const itemsString = items.join(', ')
  //const date = req.body.date;
    const totalCost= req.body.cost;
    const status = req.body.status;
    const phone =  req.body.phone;
    const location = req.body.location;
    const checkoutId = req.body.checkoutId;
    const paymentType = req.body.paymentType;
    
    const sqlInsert = "INSERT INTO Orders (items, TotalCost, Email, Location, Phone,Status, CheckoutId, PaymentType) VALUES (?,?,?,?,?,?,?,?)";
    db.query (sqlInsert,[itemsString, totalCost, email, location, phone ,status,checkoutId, paymentType ], (err, result)=>{
    console.log(err);
    console.log(result);
    result.length !== 0? (res.send(validated = true)) : (res.send(validated = false));
    });
     
});


// Handle Yoco webhook callback
app.post('/api/yoco', async (req, res) => {  
  const secretKey = process.env.SECRET_KEY; 
  const price = req.body.price
  try {
      const response = await fetch("https://payments.yoco.com/api/checkouts", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${secretKey}`,
          },
          body: JSON.stringify({
              amount: price * 100,
              currency: "ZAR",
          }),
      });

      if (!response.ok) {
          throw new Error("Failed to create checkout");
      }

      const data = await response.json();
  
      // Send the redirect URL back to the frontend
      res.json({ redirectUrl: data.redirectUrl });

  } catch (error) {
      console.error("Error creating checkout:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});



app.post('/api/ph',(req, res) => {
  const email = req.body.email

  const sqlSelect = "SELECT Phone FROM Register WHERE Email =?";
  db.query (sqlSelect, [email] ,(err, result)=>{
    //  console.log(result)
      res.send(result)
      //result.length !== 0? (res.send(validated = true)) : (res.send(validated = false));
    //  console.log(validated)
      });



})



const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

app.post('/api/sms', (req, res) => {
  const to = req.body.to;
  const body = req.body.body;

  client.messages
    .create({
      to,
      from: '+15162027291',
      body,
    })
    .then((message) => {
      console.log(`SMS sent: ${message.sid}`);
      res.send('SMS sent successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error sending SMS');
    });
});


// Using Express



const crypto = require('crypto');
const getRawBody = require('raw-body');



app.use((req, res, next) => {
    getRawBody(req, {
        length: req.headers['content-length'],
        encoding: 'utf-8'
    }, (err, rawBody) => {
        if (err) return next(err);
        req.rawBody = rawBody;
        next();
    });
});

// Using Express
app.post("/my/webhook/url", function(req, res) {
    const headers = req.headers;
    const requestBody = req.rawBody;

    // Construct the signed content
    const id = headers['webhook-id'];
    const timestamp = headers['webhook-timestamp'];

    const signedContent = `${id}.${timestamp}.${requestBody}`;

    // Determine the expected signature
    //const secret = 'whsec_M0U0MDI3QjYzMEQ0NTK5NDNCIjVFMENCMDEzNzc1QkE=';
    const secretBytes = new Buffer(secret.split('_')[1], "base64");

    const expectedSignature = crypto
        .createHmac('sha256', secretBytes)
        .update(signedContent)
        .digest('base64');

    // Compare the signatures
    const signature = headers['webhook-signature'].split(' ')[0].split(',')[1]
    if (crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature))) {
        // process webhook event
        return res.send(200);
    }
    // do not process webhook event
    return res.send(403);
});

app.post('/api/gro', (req, res) => {

  const sqlSelect = "SELECT * FROM grocery_prices";
  db.query(sqlSelect,(err, result)=>{
  console.log(result)
  res.send(result)
  //result.length !== 0? (res.send(validated = true)) : (res.send(validated = false));
//  console.log(validated)
  });
})

app.post('/api/orders', (req, res) => {

  const sqlSelect = "SELECT * FROM Orders";
  db.query(sqlSelect,(err, result)=>{
  console.log(result)
  res.send(result)
  //result.length !== 0? (res.send(validated = true)) : (res.send(validated = false));
//  console.log(validated)
  });
})

app.post('/api/shops', (req, res) => {

  const sqlSelect = "SELECT * FROM shops_prices";
  db.query(sqlSelect,(err, result)=>{
  console.log(result)
  res.send(result)
  //result.length !== 0? (res.send(validated = true)) : (res.send(validated = false));
//  console.log(validated)
  });
})

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
