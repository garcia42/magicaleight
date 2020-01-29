const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('.well-known/acme-challenge/2pJchLtsoZ_k03aoi5x4n4QLWSrWsJNWJ5m5487Mx7Y', function(req, res) {
  res.send('2pJchLtsoZ_k03aoi5x4n4QLWSrWsJNWJ5m5487Mx7Y.Erld3WnwKNjh6eYpUCNzY4ivDXQFMr4iT1ghUciAzVw')
})

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
