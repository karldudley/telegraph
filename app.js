const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Telegraph = require('./models/telegraph');
const { render } = require('ejs');
const path = require('path');

// express app
const app = express();

// connect to mongodb
const dbURI = "mongodb+srv://futureproof:fppass@telegraph.ywckmek.mongodb.net/telegraph?retryWrites=true&w=majority"

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000, () => console.log(`\nExpress departing now from port 3000!\n`)))
  .catch(err => console.log(err));

// register view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

//middleware & static files - make css public
app.use(express.static('public'));
// middleware to parese the POST url data
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: "About"});
});


//telegraph routes
app.get('/blogs', (req, res) => {
  Telegraph.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Telegraphs', blogs: result })
    })
    .catch((err) => {
      console.log(err)
    })
})

app.post('/blogs', (req, res) => {
  const blog = new Telegraph(req.body);

  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: "New Telegraph"});
});


  // 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

module.exports = app
