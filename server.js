const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/.well-known/acme-challenge/GUBzx6bMANFa8uSk2_Zhg5OG1xPTmrx3gFx6kJyXt4w', function(req, res) {
  res.send('GUBzx6bMANFa8uSk2_Zhg5OG1xPTmrx3gFx6kJyXt4w.Erld3WnwKNjh6eYpUCNzY4ivDXQFMr4iT1ghUciAzVw')
})

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
