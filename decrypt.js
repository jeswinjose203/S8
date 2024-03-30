const fs = require('fs');
const path = require('path');
const crypto = require('crypto');


// Function to decrypt data
function decrypt(encryptedText, password) {
    const decipher = crypto.createDecipher('aes-256-cbc', password);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}




const password = 'MySuperSecretPassword'; // Change this to your actual password
const folderName = 'patients';

// Path to the patients folder
const folderPath = path.join(__dirname, folderName);

// Ensure the patients folder exists, if not, create it
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}





const filename = 'data.txt';
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




            var lastData = jsonData[jsonData.length - 1];
            var msg = JSON.parse(lastData);
            console.log(msg.message);

        });
    }
});
