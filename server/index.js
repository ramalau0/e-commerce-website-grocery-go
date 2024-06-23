const express = require("express");
const bodyParser = require( 'body-parser');
const cors = require('cors')
const app = express();
const mysql = require( 'mysql')
//const yoco = require('yoco-node');
const twilio = require('twilio');
require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
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
  //const date = req.body.date;
    const totalCost= req.body.cost;
    const status = req.body.status;
    const location = req.body.location;
    
    const sqlInsert = "INSERT INTO Orders (items, TotalCost, Email, Location, Status) VALUES (?,?,?,?,?)";
    db.query (sqlInsert,[items, totalCost, email, location, status], (err, result)=>{
    console.log(err);
    result.length !== 0? (res.send(validated = true)) : (res.send(validated = false));
    });
     
});


// Handle Yoco webhook callback
app.post('/api/yoco', (req, res) => {
    //const payload = req.body.result;
    const secretKey = process.env.SECRET_KEY;; // Replace with your actual private key
  
    //const yocoClient = new yoco.Client(secretKey);
   // console.log("pau",payload)
    // Verify the webhook signature
  
      res.send(secretKey);
      //console.log()
 
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
      from: '+13252195736',
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
