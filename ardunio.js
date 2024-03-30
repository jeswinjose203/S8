const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/esp-data', (req, res) => {
    const dataFromESP = req.body;
    console.log('Data from ESP8266:', dataFromESP.message);
    res.send('Data received successfully');
});

app.post('/sensor-data', (req, res) => {
    const { heartRate, SpO2 } = req.body;
    console.log(`Received Heart Rate: ${heartRate}, SpO2: ${SpO2}`);
    // Process the data as needed
    res.send('Data received successfully');
  });
  
app.get('/', (req, res) => {
    // Send the response 'Hello' when the root path is accessed
    res.send('Hello');
  });
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://192.168.1.7:${port}`);
});
