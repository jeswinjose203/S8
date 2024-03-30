const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'securemed4@gmail.com',
      pass: 'ydmu jabf meuy wjxf'
    }
  });
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


var private_key,public_key,otp;
var doctor_private,doctor_public,doctor_smart,docter_patient_email;
var data;
var dataFromESP=" ",msg;

const password = 'MySuperSecretPassword'; // Change this to your actual password
const folderName = 'patients';
var filename = '';
// Path to the patients folder
const folderPath = path.join(__dirname, folderName);
var dataFilePath;
// Ensure the patients folder exists, if not, create it
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

// Function to encrypt data
function encrypt(text, password) {
  const cipher = crypto.createCipher('aes-256-cbc', password);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Function to decrypt data
function decrypt(encryptedText, password) {
  const decipher = crypto.createDecipher('aes-256-cbc', password);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}













const { Web3 } = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
// Replace with your deployed contract address
var contractAddress,jen;

// Replace with the ABI of your contract
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "jsonData",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "storeData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllData",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          }
        ],
        "internalType": "struct appen.MyData[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
      "inputs": [],
      "name": "jsonDataLength",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
  },
  {
    "inputs": [],
    "name": "getPath",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  }
];


  const mysql = require('mysql2'); // Make sure to install the mysql2 package

  // Assuming you have a MySQL connection pool, update the following configuration accordingly
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Jeswin@23',
    database: 'new_schema'
  });










app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/verification_doctor', (req, res) => {
  /*
  res.writeHead(200, {'Content-Type': 'text/html'});
    
  // Writing HTML tags using res.write()
  res.write('<!DOCTYPE html>');
  res.write('<html>');
  res.write('<head>');
  res.write('<title>Enter patient Details</title>');
  res.write('<style>');
  // Adding CSS styles for a responsive navigation bar
  res.write('body { margin: 0; font-family: Arial, sans-serif; }');
  res.write('nav { background-color: #333; overflow: hidden; }');
  res.write('ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; }');
  res.write('li { float: left; }');
  res.write('a { display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none; }');
  res.write('a:hover { background-color: #ddd; color: black; }');
  res.write('</style>');
  res.write('</head>');
  res.write('<body>');

  // Adding a responsive navigation bar
  res.write('<nav>');
  res.write('<ul>');
  res.write('<li><a href="/doctor.html">Doctor Login</a></li>');
  // You can add more navigation links here if needed
  res.write('</ul>');
  res.write('</nav>');

  // Adding a form for entering email
  res.write('<h1>Enter patient Details</h1>');
  res.write(`
  <form action="/looking-for-email" method="post" style="text-align: center;">
  <label for="email" style="display: block; margin-bottom: 10px;">Email:</label>
  <input type="email" id="email" name="email" required style="padding: 10px; margin-bottom: 10px;">
  <input type="submit" value="Check Email" style="padding: 10px;">
</form>
  `);

  res.write('</body>');
  res.write('</html>');
*/  res.write(`
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Design by foolishdeveloper.com -->
    <title>Glassmorphism login Form Tutorial in html css</title>
 
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
    <!--Stylesheet-->
    <style media="screen">
      *,
*:before,
*:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body{
    background-color: #e5e2f9;
}
.background{
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
}
.background .shape{
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
}
.shape:first-child{
    background: linear-gradient(
        #1845ad,
        #23a2f6
    );
    left: -80px;
    top: -80px;
}
.shape:last-child{
    background: linear-gradient(
        to right,
        #ff512f,
        #f09819
    );
    right: -30px;
    bottom: -80px;
}
form{
    height: 520px;
    width: 400px;
    background-color: rgba(255,255,255,0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
}
form *{
    font-family: 'Poppins',sans-serif;
    color: #68a1e7;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}
form h3{
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
}

label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}
input{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
}
::placeholder{
    color: #6e728d;
}
button{
    margin-top: 50px;
    width: 100%;
    background-color: #000b61;
    color: #fefefe;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
}
.social{
  margin-top: 30px;
  display: flex;
}
.social div{
  background: red;
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255,255,255,0.27);
  color: #eaf0fb;
  text-align: center;
}
.social div:hover{
  background-color: rgba(255,255,255,0.47);
}
.social .fb{
  margin-left: 25px;
}
.social i{
  margin-right: 4px;
}

    </style>
</head>
<body>
    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form action='/looking-for-email' method='post'>
        <h3>Patient Email</h3>

        <label for="username">Email</label>
        <input type="text" placeholder="Email or Phone" name="email" id="username">

        <button>Submit</button>
        <!--<div class="social">
          <div class="go"><i class="fab fa-google"></i>  Google</div>
          <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
        </div>-->
    </form>
</body>
</html>

  `);
  // End the response
  res.end();
});
app.get('/doctor.html', (req, res) => {
  /*
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  // Writing HTML tags using res.write()
  res.write('<!DOCTYPE html>');
  res.write('<html>');
  res.write('<head>');
  res.write('<title>Hello Doctor</title>');
  res.write('<style>');
  // Adding CSS styles for a responsive navigation bar
  res.write('body { margin: 0; font-family: Arial, sans-serif; }');
  res.write('nav { background-color: #333; overflow: hidden; }');
  res.write('ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; }');
  res.write('li { float: left; }');
  res.write('a { display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none; }');
  res.write('a:hover { background-color: #ddd; color: black; }');
  res.write('</style>');
  res.write('</head>');
  res.write('<body>');

  // Adding a responsive navigation bar
  res.write('<nav>');
  res.write('<ul>');
  res.write('<li><a href="/doctor.html">Patient Login</a></li>');
  // You can add more navigation links here if needed
  res.write('</ul>');
  res.write('</nav>');

  // Adding a form for entering email
  res.write('<h1>Hello Doctor</h1>');
  res.write(`
  <form action="/verify-doctor" method="post" style="text-align: center;">
    <label for="otp" style="display: block; margin-bottom: 10px;">Email:</label>
    <input type="text" id="otp" name="otp" required style="padding: 10px; margin-bottom: 10px;">

    <label for="privateKey" style="display: block; margin-bottom: 10px;">Password:</label>
    <input type="password" id="privateKey" name="privateKey" required style="padding: 10px; margin-bottom: 10px;">

    <input type="submit" value="Verify" style="padding: 10px;">
  </form>
`);

  res.write('</body>');
  res.write('</html>');

  // End the response
  res.end();*/
  res.write(`
  <!DOCTYPE html>
<html lang="en">
<head>
  <!-- Design by foolishdeveloper.com -->
    <title>Glassmorphism login Form Tutorial in html css</title>
 
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
    <!--Stylesheet-->
    <style media="screen">
      *,
*:before,
*:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body{
    background-color: #e5e2f9;
}
.background{
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
}
.background .shape{
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
}
.shape:first-child{
    background: linear-gradient(
        #1845ad,
        #23a2f6
    );
    left: -80px;
    top: -80px;
}
.shape:last-child{
    background: linear-gradient(
        to right,
        #ff512f,
        #f09819
    );
    right: -30px;
    bottom: -80px;
}
form{
    height: 520px;
    width: 400px;
    background-color: rgba(255,255,255,0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
}
form *{
    font-family: 'Poppins',sans-serif;
    color: #68a1e7;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}
form h3{
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
}

label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}
input{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
}
::placeholder{
    color: #6e728d;
}
button{
    margin-top: 50px;
    width: 100%;
    background-color: #000b61;
    color: #fefefe;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
}
.social{
  margin-top: 30px;
  display: flex;
}
.social div{
  background: red;
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255,255,255,0.27);
  color: #eaf0fb;
  text-align: center;
}
.social div:hover{
  background-color: rgba(255,255,255,0.47);
}
.social .fb{
  margin-left: 25px;
}
.social i{
  margin-right: 4px;
}

    </style>
</head>
<body>
    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form action='/verify-doctor' method='post'>
        <h3>Login Here</h3>

        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" name="otp" id="username">

        <label for="password">Password</label>
        <input type="password" placeholder="Password" name="privateKey" id="password">

        <button>Log In</button>
        <!--<div class="social">
          <div class="go"><i class="fab fa-google"></i>  Google</div>
          <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
        </div>-->
    </form>
</body>
</html>

  `);
  res.end();
});
app.post('/verify-doctor', (req, res) => {
  var enteredOTP = req.body.otp;
  var enteredPrivateKey = req.body.privateKey;
  var contractab = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "credentials",
      "outputs": [
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "password",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_password",
          "type": "string"
        }
      ],
      "name": "isCredentialValid",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];
  var contractadd = '0x68cA6c3324Bd32e903D75B0b26078181A0E31FDD';
  var contra = new web3.eth.Contract(contractab, contractadd);
  async function checkCredentials(email, password) {
    try {
        const result = await contra.methods.isCredentialValid(email, password).call();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  }
  var emailToCheck = enteredOTP;
  var passwordToCheck = enteredPrivateKey;
  checkCredentials(emailToCheck, passwordToCheck)
    .then(result => {
        console.log(`Are the credentials valid?`, result);
        if(result== true)
        {
          res.redirect('/verification_doctor');
          console.log(1);
        }
        else 
        {
          res.redirect('/doctor.html');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        res.redirect('/doctor.html');
    });
});
app.post('/looking-for-email',async (req, res) => {
  const email = req.body.email;
  docter_patient_email = email;
  // Check if the email is in the new_scheme.users table
  const selectQuery = 'SELECT private, public, smart,data FROM new_schema.users WHERE email = ?';


  pool.query(selectQuery, [email], (selectErr, selectResults) => {
    if (selectErr) {
      return res.status(500).send('Internal Server Error');
    }

    if (selectResults.length > 0) {
      // Email exists, return the columns
      doctor_private = selectResults[0].private;
      doctor_public = selectResults[0].public;
      doctor_smart = selectResults[0].smart;
      filename = selectResults[0].data;
      



  // Path to the data file inside the patients folder
  var dataFilePath = path.join(folderPath, filename);

  // Check if the file exists
  fs.access(dataFilePath, fs.constants.F_OK, (err) => {
      if (err) {
          // If the file doesn't exist
          console.log("file is not there");
      } else {
          // If the file exists, read its content, decrypt it, append the new data, and write back
          fs.readFile(dataFilePath, 'utf8', (err, fileData) => {
              if (err) throw err;
              const decryptedData = decrypt(fileData, password);
              let jsonData = [];
              try {
                  jsonData = JSON.parse(decryptedData);
              } catch (parseError) {
                  console.error('Error parsing JSON:', parseError);
                  // If parsing fails, treat existing data as an array
                  jsonData = [];
              }
             data = jsonData;
          });
      }
  });








        res.redirect('/view_till_date_details');
    

        
      

      
    } else {
      msg = "";
      // Email does not exist, update an existing row with an empty email field
      const updateQuery = 'UPDATE new_schema.users SET email = ? WHERE email IS NULL or email = "" LIMIT 1';
      pool.query(updateQuery, [email], (updateErr, updateResults) => {
        if (updateErr) {
          return res.status(500).send('Internal Server Error');
        }

        if (updateResults.affectedRows > 0) {
          // Row updated successfully
          doctor_private = 0;
          doctor_public = 0;
          doctor_smart = 0;
          console.log("exxecuted here");
          res.redirect('/view_till_date_details');
        } else {
          // No rows were updated, consider handling this case based on your requirements
          res.redirect('/doctor.html');
        }
      });
    }
  });
});
/*async function getPath() {
  console.log("caMe here");
  const contract = new web3.eth.Contract(contractABI, doctor_smart);
  // Call the getJeswin function from your contract.
  const result = await contract.methods.getPath().call();
  console.log(result);
  return result; // This will log "jeswin" to the console.
}*/
/*
function jeswin(){
  (async () => {
      filename = await getPath();
      console.log(filename);
    
  // Path to the data file inside the patients folder
const dataFilePath = path.join(folderPath, filename);

// Check if the file exists
fs.access(dataFilePath, fs.constants.F_OK, (err) => {
    if (err) {
        // If the file doesn't exist
        console.log("file is not there");
    } else {
        // If the file exists, read its content, decrypt it, append the new data, and write back
        fs.readFile(dataFilePath, 'utf8', (err, fileData) => {
            if (err) throw err;
            const decryptedData = decrypt(fileData, password);
            let jsonData = [];
            try {
                jsonData = JSON.parse(decryptedData);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                // If parsing fails, treat existing data as an array
                jsonData = [];
            }
           data = jsonData;
        });
    }
});
  });
}*/

app.get('/view_till_date_details', (req, res) => {

  // Example function to get the current data value from your contract
  async function getAllData() {
    const contract = new web3.eth.Contract(contractABI, doctor_smart);
    // Call the data function on the contract
    const currentValue = await contract.methods.getAllData().call();
    return currentValue;
    }
    (async () => {
      res.write(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Number Details</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  max-width: 800px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
      
              h1 {
                  text-align: center;
                  color: #333;
              }
      
              .number-list {
                  list-style-type: none;
                  padding: 0;
              }
      
              .number-item {
                  padding: 20px;
                  border-bottom: 1px solid #eee;
                  transition: background-color 0.3s ease;
              }
      
              .number-item:hover {
                  background-color: #f5f5f5;
              }
      
              .number {
                  display: inline-block;
                  width: 40px;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  color: #fff;
                  background-color: #007bff;
                  border-radius: 50%;
                  font-size: 18px;
                  margin-right: 10px;
              }
      
              .number-details {
                  display: inline-block;
                  vertical-align: middle;
                  font-size: 16px;
                  color: #333;
              }
          </style>
      </head>`);
      if(doctor_private!=0)
      {
        console.log(dataFromESP);
        console.log(doctor_smart);
        jen = await getAllData(); // Wait for getData() to complete
        console.log("here");
        console.log(jen);
        var ind = Object.keys(jen).length;
        console.log(jen[ind-1].name);
        console.log(docter_patient_email);
        console.log(doctor_private);
        console.log(doctor_public);
        console.log(doctor_smart);
        var mi;
        if(data)
        {
          if(ind<data.length)
          {
            mi = ind;
          }
          else 
          {
            mi = data.length;
          }
        }
        else 
        {
          mi = ind;
        }
        var i = data.length;
        var j = ind;
        res.write(`
          <div class="container">
    <h1>Number Details</h1>
    <ul class="number-list">
          `);
        for (j=data.length-1,i=ind-1;i>=(ind-mi) && j>=(data.length-mi);i--,j--)
        {
          
          res.write(`<li class="number-item">
          <div class="number">`+jen[i].name+`</div>`);
       // res.write(`<h1>Heart rate stored was : `+jen[i].name+`</h1>`);

        if(data)
        {
          msg = JSON.parse(data[j]);
          res.write(`<div class="number-details" style="font-size: 16px; color: #333; padding: 5px; border: 1px solid #ccc; margin-bottom: 10px; display: block;">` + msg.message + `</div>`);
res.write(`<div class="number-details" style="font-size: 16px; color: #333; padding: 5px; border: 1px solid #ccc; margin-bottom: 10px; display: block;">` + msg.age + `</div>`);
res.write(`<div class="number-details" style="font-size: 16px; color: #333; padding: 5px; border: 1px solid #ccc; display: block;">` + msg.number + `</div>`);

        res.write(`</li>`); 
        }
        }
        res.write(`</ul></div>`);
        res.write(`<h1>`+docter_patient_email+`</h1>`);
        /*res.write(`<h1>`+doctor_private+`</h1>`);
        res.write(`<h1>`+doctor_public+`</h1>`);
        res.write(`<h1>`+doctor_smart+`</h1>`);*/
        /*
        if(data)
        {
          
        for(var i=mi;i>=0;i--)
        {
          msg = JSON.parse(data[i]);
        res.write(`<h1>`+msg.message+`</h1>`);
        }
        }
        */
        if (typeof dataFromESP === 'undefined') {
          console.log("no data has been sent");
          res.write(`no data available`);
      } else {

        /*
        res.write(`<label for="textInput">Enter text:</label>
    <input type="text" id="textInput" name="textInput">
    <script>
        // Function to save input data to localStorage
        function saveData() {
            var inputText = document.getElementById("textInput").value;
            localStorage.setItem("savedText", inputText);
        }

        // On page load, check if there's saved data and populate the input field
        window.onload = function() {
            var savedText = localStorage.getItem("savedText");
            if (savedText) {
                document.getElementById("textInput").value = savedText;
            }
        };

        // Listen for input events on the text input field and automatically save data
        document.getElementById("textInput").addEventListener("input", saveData);
    </script>
    `);
          res.write(`<h1>write`+dataFromESP+` to blockchain</h1>`);
          res.write(`<a href="add-to-blockchain"><button>Add this data</button></a>`);*/
          res.write(`<form id="myForm" action="/add-to-blockchain" method="post" style="margin: 0 auto; width: 300px; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f9f9f9;">
          <label for="textInput" style="display: block; margin-bottom: 10px;">Enter text:</label>
          <input type="text" id="textInput" name="textInput" style="width: 100%; padding: 8px; margin-bottom: 10px; box-sizing: border-box;">
          <input type="text" id="jen" name="age" style="width: 100%; padding: 8px; margin-bottom: 10px; box-sizing: border-box;">
          <input type="text" id="bros" name="number" style="width: 100%; padding: 8px; margin-bottom: 10px; box-sizing: border-box;">
          <input type="text" id="dataFromESP" name="dataFromESP" value="` + dataFromESP + `"width: 100%; padding: 8px; margin-bottom: 10px; box-sizing: border-box;"> <!-- Assuming you want to hide this input -->
          <input type="submit" value="Add this data" style="width: 100%; padding: 10px; border: none; background-color: #007bff; color: #fff; border-radius: 5px; cursor: pointer;">
      </form>
      
      <script>
      // Function to save input data to localStorage
      function saveData() {
          var inputText = document.getElementById("textInput").value;
          localStorage.setItem("savedText", inputText);
      }
      
      function saveData1() {
          var inputText1 = document.getElementById("jen").value;
          localStorage.setItem("savedText1", inputText1);
      }
      function saveData2() {
        var inputText2 = document.getElementById("bros").value;
        localStorage.setItem("savedText2", inputText2);
    }
      // On page load, check if there's saved data and populate the input field
      window.onload = function() {
          var savedText = localStorage.getItem("savedText");
          if (savedText) {
              document.getElementById("textInput").value = savedText;
          }
          var savedText1 = localStorage.getItem("savedText1"); // Change key to "savedText1"
          if (savedText1) {
              document.getElementById("jen").value = savedText1;
          }
          var savedText2 = localStorage.getItem("savedText2"); // Change key to "savedText1"
          if (savedText2) {
              document.getElementById("bros").value = savedText2;
          }
      };
      
      // Listen for input events on the text input field and automatically save data
      document.getElementById("textInput").addEventListener("input", saveData);
      document.getElementById("jen").addEventListener("input", saveData1);
      document.getElementById("bros").addEventListener("input", saveData2);
      </script>
      
`);

      }
      res.write('<meta http-equiv="refresh" content="10">');
      res.end();
      }
      else 
      {
        //need to get the data
        
      res.redirect('/new-patient');  
      }
      
    })();
});
app.get('/new-patient',(req,res)=>{
  

  res.write(`<h1></h1>
  <form id="myForm" action="/add-to-blockchain" method="post">
    <label for="textInput">Enter text:</label>
    <input type="text" id="textInput" name="textInput">
    <input type="text" id="dataFromESP" name="dataFromESP" value="` + dataFromESP + `">
    <input type="submit" value="Add this data">
</form>
<script>
    // Function to save input data to localStorage
    function saveData() {
        var inputText = document.getElementById("textInput").value;
        localStorage.setItem("savedText", inputText);
    }

    // On page load, check if there's saved data and populate the input field
    window.onload = function() {
        var savedText = localStorage.getItem("savedText");
        if (savedText) {
            document.getElementById("textInput").value = savedText;
        }
    };

    // Listen for input events on the text input field and automatically save data
    document.getElementById("textInput").addEventListener("input", saveData);
</script>
  `);
  res.write('<meta http-equiv="refresh" content="10">');
  res.end();

});
app.post('/add-to-blockchain',(req,res)=>{
  console.log("data added to blockchain");
  console.log(docter_patient_email);
  const selectQuery = 'SELECT private, public, smart, data FROM new_schema.users WHERE email = ?';
  pool.query(selectQuery, [docter_patient_email], (selectErr, selectResults) => {
    if (selectErr) {
      return res.status(500).send('Internal Server Error');
    }

    if (selectResults.length > 0) {
      // Email exists, return the columns
      doctor_private = selectResults[0].private;
      doctor_public = selectResults[0].public;
      doctor_smart = selectResults[0].smart;
      filename = selectResults[0].data;

      // Create a contract instance
      const contract = new web3.eth.Contract(contractABI, doctor_smart);
      //writing data to smart contract

      async function storeData(name) {
        try {
            const data = await contract.methods.getAllData().call();
            const fromAccount = doctor_public;
            //console.log('All Data:', data);
            id = Object.keys(data).length;
            // Call the storeData function on the contract and specify the data values
            const transaction = await contract.methods.storeData(id, name).send({ from: fromAccount });
            
            //console.log('Data stored in contract. Transaction Hash:', transaction.transactionHash);
        } catch (error) {
            console.error('Error storing data:', error);
        }
      }
      
      // Function to retrieve all data from the smart contract
      async function getAllData() {
        try {
            // Call the getAllData function on the contract to retrieve all data
            const data = await contract.methods.getAllData().call();
      
            return data;
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
      
      }
       (async () => {
        await storeData(dataFromESP.toString());
        var jen = await getAllData();
        console.log(jen);





        //sdrhgofjdgvjpoasHFICEWJDROIGNIERBIFJMRK;EDSHUP9IHgu

        const txt = {
          message: req.body.textInput,
          age: req.body.age,
          number: req.body.number 
      };
      
      
      const dataToAppend = JSON.stringify(txt);
      
      // Path to the data file inside the patients folder
      const dataFilePath = path.join(folderPath, filename);
      
      // Check if the file exists
      fs.access(dataFilePath, fs.constants.F_OK, (err) => {
          if (err) {
              // If the file doesn't exist, create it and append the data
              var encry = JSON.stringify([dataToAppend]);
              fs.writeFileSync(dataFilePath, encrypt(encry, password));
              console.log(`Data appended to ${dataFilePath}`);
              var lastData = JSON.parse(encry);
              /*var msg = JSON.parse(lastData);
              console.log(msg.message); */
              data = lastData;
              console.log("testing");
              console.log(data);
          } else {
              // If the file exists, read its content, decrypt it, append the new data, and write back
              fs.readFile(dataFilePath, 'utf8', (err, fileData) => {
                  if (err) throw err;
                  const decryptedData = decrypt(fileData, password);
                  let jsonData = [];
                  try {
                      jsonData = JSON.parse(decryptedData);
                      console.log(jsonData);
                  } catch (parseError) {
                      console.error('Error parsing JSON:', parseError);
                      // If parsing fails, treat existing data as an array
                      jsonData = [];
                  }
                  // Append new data to the existing JSON array
                  jsonData.push(dataToAppend);
      
      
                  
                  var lastData = jsonData[jsonData.length - 1];
                  var msg = JSON.parse(lastData);
                  console.log(msg.message);
                  
                  data = jsonData;
                  console.log('heere');
                  console.log(data);
                  // Write the updated JSON array back to the file
                  fs.writeFileSync(dataFilePath, encrypt(JSON.stringify(jsonData), password));
                  console.log(`Data appended to ${dataFilePath}`);
              });
          }
      });
      
      

          //lfdghodjbovmvcdjkbnopsoasbdjkndgfilkjvbfgvhjfhgtghthtj


















        res.redirect('/view_till_date_details');
        })();


    } else {
      console.log("Some issue has been occured");
    }
  });
});
app.post('/sensor-data', (req, res) => {
  const { heartRate, SpO2 } = req.body;
  console.log(`Received Heart Rate: ${heartRate}, SpO2: ${SpO2}`);
  // Process the data as needed
  dataFromESP = heartRate;
  dataFromESP = 78;
  res.redirect('/view_till_date_details');
});


app.get('/patient.html', (req, res) => {
  /*
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    // Writing HTML tags using res.write()
    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Hello Patient</title>');
    res.write('<style>');
    // Adding CSS styles for a responsive navigation bar
    res.write('body { margin: 0; font-family: Arial, sans-serif; }');
    res.write('nav { background-color: #333; overflow: hidden; }');
    res.write('ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; }');
    res.write('li { float: left; }');
    res.write('a { display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none; }');
    res.write('a:hover { background-color: #ddd; color: black; }');
    res.write('</style>');
    res.write('</head>');
    res.write('<body>');

    // Adding a responsive navigation bar
    res.write('<nav>');
    res.write('<ul>');
    res.write('<li><a href="/patient.html">Patient Login</a></li>');
    // You can add more navigation links here if needed
    res.write('</ul>');
    res.write('</nav>');

    // Adding a form for entering email
    res.write('<h1>Hello Patient</h1>');
    res.write(`
    <form action="/check-email" method="post" style="text-align: center;">
    <label for="email" style="display: block; margin-bottom: 10px;">Email:</label>
    <input type="email" id="email" name="email" required style="padding: 10px; margin-bottom: 10px;">
    <input type="submit" value="Check Email" style="padding: 10px;">
  </form>
    `);

    res.write('</body>');
    res.write('</html>');
*/
res.write(`
<!DOCTYPE html>
<html lang="en">
<head>
<!-- Design by foolishdeveloper.com -->
  <title>Glassmorphism login Form Tutorial in html css</title>

  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
  <!--Stylesheet-->
  <style media="screen">
    *,
*:before,
*:after{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body{
  background-color: #e5e2f9;
}
.background{
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%,-50%);
  left: 50%;
  top: 50%;
}
.background .shape{
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
}
.shape:first-child{
  background: linear-gradient(
      #1845ad,
      #23a2f6
  );
  left: -80px;
  top: -80px;
}
.shape:last-child{
  background: linear-gradient(
      to right,
      #ff512f,
      #f09819
  );
  right: -30px;
  bottom: -80px;
}
form{
  height: 520px;
  width: 400px;
  background-color: rgba(255,255,255,0.13);
  position: absolute;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.1);
  box-shadow: 0 0 40px rgba(8,7,16,0.6);
  padding: 50px 35px;
}
form *{
  font-family: 'Poppins',sans-serif;
  color: #68a1e7;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
form h3{
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}

label{
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}
input{
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255,255,255,0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
::placeholder{
  color: #6e728d;
}
button{
  margin-top: 50px;
  width: 100%;
  background-color: #000b61;
  color: #fefefe;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}
.social{
margin-top: 30px;
display: flex;
}
.social div{
background: red;
width: 150px;
border-radius: 3px;
padding: 5px 10px 10px 5px;
background-color: rgba(255,255,255,0.27);
color: #eaf0fb;
text-align: center;
}
.social div:hover{
background-color: rgba(255,255,255,0.47);
}
.social .fb{
margin-left: 25px;
}
.social i{
margin-right: 4px;
}

  </style>
</head>
<body>
  <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
  </div>
  <form action='/check-email' method='post'>
      <h3>Login Here</h3>

      <label for="username">Email</label>
      <input type="text" placeholder="Email or Phone" name="email" id="username">

      <button>Log In</button>
      <!--<div class="social">
        <div class="go"><i class="fab fa-google"></i>  Google</div>
        <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
      </div>-->
  </form>
</body>
</html>

`);
    // End the response
    res.end();
});
// Route to handle form submission and check email in the database
app.post('/check-email', (req, res) => {
    var email = req.body.email;
    console.log(email);
    // Assuming you have a 'users' table in your MySQL database
    pool.query('SELECT private, public,smart,data FROM new_schema.users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.send('Error checking email.');
        }

        if (results.length === 0) {
            // User not registered
            return res.send('You are not registered.');
        } else {
            // User found in the database
            otp = Math.floor(1000 + Math.random() * 9000);
            const mailOptions = {
                from: 'securemed4@gmail.com',
                to: email,
                subject: 'OTP',
                text: otp.toString()
              };
              
              // Send the email
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });





            var user = results[0];
            private_key = user.private;
            public_key = user.public;
            contractAddress = user.smart;
            filename = user.data;
            docter_patient_email = email;
            dataFilePath = path.join(folderPath, filename);
            













                    // Create a contract instance
                    const contract = new web3.eth.Contract(contractABI, contractAddress);

                    // Example function to get the current data value from your contract
                    async function getData() {
                    // Call the data function on the contract
                    const currentValue = await contract.methods.getAllData().call();


                    return currentValue;
                    }
                    (async () => {

                      jen = await getData(); // Wait for getData() to complete
                      //console.log(jen);

                    })();





































            res.redirect('/verification_patient');
           // return res.send(`Welcome, registered user! Private: ${private_key}, Public: ${public_key}`);
        }
    });
});
app.get('/verification_patient', (req, res) => {
  /*
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    // Writing HTML tags using res.write()
    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Hello Patient</title>');
    res.write('<style>');
    // Adding CSS styles for a responsive navigation bar
    res.write('body { margin: 0; font-family: Arial, sans-serif; }');
    res.write('nav { background-color: #333; overflow: hidden; }');
    res.write('ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; }');
    res.write('li { float: left; }');
    res.write('a { display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none; }');
    res.write('a:hover { background-color: #ddd; color: black; }');
    res.write('</style>');
    res.write('</head>');
    res.write('<body>');

    // Adding a responsive navigation bar
    res.write('<nav>');
    res.write('<ul>');
    res.write('<li><a href="/patient.html">Patient Login</a></li>');
    // You can add more navigation links here if needed
    res.write('</ul>');
    res.write('</nav>');

    // Adding a form for entering email
    res.write('<h1>Hello Patient</h1>');
    res.write(`
    <form action="/verify-otp-private-key" method="post" style="text-align: center;">
      <label for="otp" style="display: block; margin-bottom: 10px;">OTP:</label>
      <input type="text" id="otp" name="otp" required style="padding: 10px; margin-bottom: 10px;">
  
      <label for="privateKey" style="display: block; margin-bottom: 10px;">Private Key:</label>
      <input type="text" id="privateKey" name="privateKey" required style="padding: 10px; margin-bottom: 10px;">
  
      <input type="submit" value="Verify" style="padding: 10px;">
    </form>
  `);

    res.write('</body>');
    res.write('</html>');
    */
    res.write(`
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <!-- Design by foolishdeveloper.com -->
      <title>Glassmorphism login Form Tutorial in html css</title>
   
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
      <!--Stylesheet-->
      <style media="screen">
        *,
  *:before,
  *:after{
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }
  body{
      background-color: #e5e2f9;
  }
  .background{
      width: 430px;
      height: 520px;
      position: absolute;
      transform: translate(-50%,-50%);
      left: 50%;
      top: 50%;
  }
  .background .shape{
      height: 200px;
      width: 200px;
      position: absolute;
      border-radius: 50%;
  }
  .shape:first-child{
      background: linear-gradient(
          #1845ad,
          #23a2f6
      );
      left: -80px;
      top: -80px;
  }
  .shape:last-child{
      background: linear-gradient(
          to right,
          #ff512f,
          #f09819
      );
      right: -30px;
      bottom: -80px;
  }
  form{
      height: 520px;
      width: 400px;
      background-color: rgba(255,255,255,0.13);
      position: absolute;
      transform: translate(-50%,-50%);
      top: 50%;
      left: 50%;
      border-radius: 10px;
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255,255,255,0.1);
      box-shadow: 0 0 40px rgba(8,7,16,0.6);
      padding: 50px 35px;
  }
  form *{
      font-family: 'Poppins',sans-serif;
      color: #68a1e7;
      letter-spacing: 0.5px;
      outline: none;
      border: none;
  }
  form h3{
      font-size: 32px;
      font-weight: 500;
      line-height: 42px;
      text-align: center;
  }
  
  label{
      display: block;
      margin-top: 30px;
      font-size: 16px;
      font-weight: 500;
  }
  input{
      display: block;
      height: 50px;
      width: 100%;
      background-color: rgba(255,255,255,0.07);
      border-radius: 3px;
      padding: 0 10px;
      margin-top: 8px;
      font-size: 14px;
      font-weight: 300;
  }
  ::placeholder{
      color: #6e728d;
  }
  button{
      margin-top: 50px;
      width: 100%;
      background-color: #000b61;
      color: #fefefe;
      padding: 15px 0;
      font-size: 18px;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
  }
  .social{
    margin-top: 30px;
    display: flex;
  }
  .social div{
    background: red;
    width: 150px;
    border-radius: 3px;
    padding: 5px 10px 10px 5px;
    background-color: rgba(255,255,255,0.27);
    color: #eaf0fb;
    text-align: center;
  }
  .social div:hover{
    background-color: rgba(255,255,255,0.47);
  }
  .social .fb{
    margin-left: 25px;
  }
  .social i{
    margin-right: 4px;
  }
  
      </style>
  </head>
  <body>
      <div class="background">
          <div class="shape"></div>
          <div class="shape"></div>
      </div>
      <form action='/verify-otp-private-key' method='post'>
          <h3>Login Here</h3>
  
          <label for="username">OTP</label>
          <input type="text" placeholder="Email or Phone" name="otp" id="username">
  
          <label for="password">Private Key</label>
          <input type="password" placeholder="Password" name="privateKey" id="password">
  
          <button>Log In</button>
          <!--<div class="social">
            <div class="go"><i class="fab fa-google"></i>  Google</div>
            <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
          </div>-->
      </form>
  </body>
  </html>
  
    `);
    // End the response
    res.end();
});
app.post('/verify-otp-private-key', (req, res) => {
    var enteredOTP = req.body.otp;
    var enteredPrivateKey = req.body.privateKey;
    console.log(otp);
    console.log(private_key);
    console.log(public_key);
    console.log(req.body.otp);
    console.log(req.body.privateKey);
    fs.access(dataFilePath, fs.constants.F_OK, (err) => {
      if (err) {
          // If the file doesn't exist
          console.log("file is not there");
      } else {
          // If the file exists, read its content, decrypt it, append the new data, and write back
          fs.readFile(dataFilePath, 'utf8', (err, fileData) => {
              if (err) throw err;
              const decryptedData = decrypt(fileData, password);
              let jsonData = [];
              try {
                  jsonData = JSON.parse(decryptedData);
              } catch (parseError) {
                  console.error('Error parsing JSON:', parseError);
                  // If parsing fails, treat existing data as an array
                  jsonData = [];
              }
             data = jsonData;
             console.log("jen");
             console.log(data);
             console.log("bros");
          });
      }
  });



    if (otp == enteredOTP && private_key === enteredPrivateKey) { // Replace with your success response
      res.redirect('/verified');
    } else {
      res.send('Verification failed. Please check your OTP and private key.'); // Replace with your failure response
      res.redirect('/verification_patient');
    }
  });
app.get('/verified', (req, res) => {
  // Function to retrieve all data from the smart contract
async function getAllData() {
  try {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
      // Call the getAllData function on the contract to retrieve all data
      const data = await contract.methods.getAllData().call();
      console.log("entered here");
      return data;
  } catch (error) {
      console.error('Error retrieving data:', error);
  }

}
 (async () => {
  res.write(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Number Details</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  max-width: 800px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
      
              h1 {
                  text-align: center;
                  color: #333;
              }
      
              .number-list {
                  list-style-type: none;
                  padding: 0;
              }
      
              .number-item {
                  padding: 20px;
                  border-bottom: 1px solid #eee;
                  transition: background-color 0.3s ease;
              }
      
              .number-item:hover {
                  background-color: #f5f5f5;
              }
      
              .number {
                  display: inline-block;
                  width: 40px;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  color: #fff;
                  background-color: #007bff;
                  border-radius: 50%;
                  font-size: 18px;
                  margin-right: 10px;
              }
      
              .number-details {
                  display: inline-block;
                  vertical-align: middle;
                  font-size: 16px;
                  color: #333;
              }
          </style>
      </head>`);
  var jen = await getAllData();
    console.log(jen);
    var ind = Object.keys(jen).length;
    if(data)
        {
          if(ind<data.length)
          {
            mi = ind;
          }
          else 
          {
            mi = data.length;
          }
        }
        else 
        {
          mi = ind;
        }
        var i = data.length;
        var j = ind;
        res.write(`
          <div class="container">
    <h1>Number Details</h1>
    <ul class="number-list">
          `);
        for (j=data.length-1,i=ind-1;i>=(ind-mi) && j>=(data.length-mi);i--,j--)
        {
          res.write(`<li class="number-item">
          <div class="number">`+jen[i].name+`</div>`);
       // res.write(`<h1>Heart rate stored was : `+jen[i].name+`</h1>`);

        if(data)
        {
          msg = JSON.parse(data[j]);
        //res.write(`<h1>`+msg.message+`</h1>`); 
        res.write(`<div class="number-details" style="font-size: 16px; color: #333; padding: 5px; border: 1px solid #ccc; margin-bottom: 10px; display: block;">` + msg.message + `</div>`);
        res.write(`<div class="number-details" style="font-size: 16px; color: #333; padding: 5px; border: 1px solid #ccc; margin-bottom: 10px; display: block;">` + msg.age + `</div>`);
        res.write(`<div class="number-details" style="font-size: 16px; color: #333; padding: 5px; border: 1px solid #ccc; display: block;">` + msg.number + `</div>`);
        res.write(`</li>`); 
        }
        
        }
        res.write(`</ul></div>`);
        res.write(`<h1>`+docter_patient_email+`</h1>`);
        res.end();
  })();
});

  











const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://192.168.1.7:${port}`);
});
