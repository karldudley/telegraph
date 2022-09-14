const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Telegraph = require('./models/telegraph');

// express app
const app = express();
app.use(bodyParser.json())
app.use(cors())

// connect to mongodb
const dbURI = "mongodb+srv://futureproof:fppass@telegraph.ywckmek.mongodb.net/telegraph?retryWrites=true&w=majority"

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000, () => console.log(`\nExpress departing now from port 3000!\n`)))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello alllllllllllllll!')
})


  // mongoose & mongo tests
app.get('/add-telegraph', (req, res) => {
    const telegraph = new Telegraph({
      title: 'new telegraph 2',
      name: 'my name 2',
      body: 'more about my new telegraph 2'
    })
  
    telegraph.save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  module.exports = app
