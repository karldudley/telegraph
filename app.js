const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Telegraph = require('./models/telegraph');
const { render } = require('ejs');
const { result } = require('lodash');
const port = process.env.PORT || 3000;

// express app
const app = express();

// connect to mongodb
const dbURI = "mongodb+srv://futureproof:fppass@telegraph.ywckmek.mongodb.net/telegraph?retryWrites=true&w=majority"

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(port, () => console.log(`\nExpress departing now from port ${port}!\n`)))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

//middleware & static files - make css public
app.use(express.static('public'));
// middleware to parse the POST url data
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {
  // res.send("Hello!")
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
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: "New Telegraph"});
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Telegraph.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details'})
    })
    .catch(err => {
      console.log(err);
    })
})

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Telegraph.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: '/blogs' })
    })
    .catch(err => {
      console.log(err)
    })
})

  // 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

module.exports = app
