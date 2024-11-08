const express = require('express')
var cors = require('cors')
const app = express();
// include token here
const token = '';
const port = 3000
app.use(cors())
// Middleware to parse JSON bodies
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/branches', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  // var request = require('request');
    const data = await fetch('https://api.foodics.dev/v5' + req.url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`, // Add custom headers if needed
        },
    })
    const json = await data.json();
    res.write(JSON.stringify(json));
    res.end();
    
})

app.post('/branches/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  const data = await fetch('https://api.foodics.dev/v5' + req.url, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`, // Add custom headers if needed
      },
      body: JSON.stringify(req.body), // Add request body if needed
  })
  const json = await data.json();
  res.write(JSON.stringify(json));
  res.end();
})

app.listen(port, function (error) {
  if (error) {
    coonsole.log("Something went wrong", error)
  } else {
    console.log('Server is listening n port ', port)
  }
})
