const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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



//const dataToAppend = 'This is some sensitive data.';













const password = 'MySuperSecretPassword'; // Change this to your actual password
const folderName = 'patients';

// Path to the patients folder
const folderPath = path.join(__dirname, folderName);

// Ensure the patients folder exists, if not, create it
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}




const filename = 'one.txt';




const jen = {
    message: 'This is some sensitive data.',
    additionalInfo: 'Any additional information you want to include in the JSON object.'
};


const dataToAppend = JSON.stringify(jen);

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
        var msg = JSON.parse(lastData);
        console.log(msg.message);

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


            // Write the updated JSON array back to the file
            fs.writeFileSync(dataFilePath, encrypt(JSON.stringify(jsonData), password));
            console.log(`Data appended to ${dataFilePath}`);
        });
    }
});
