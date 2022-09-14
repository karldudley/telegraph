const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Telegraph = require('./models/telegraph');
const { render } = require('ejs');


// const bodyParser = require('body-parser');
// const cors = require('cors');


// express app
const app = express();
// app.use(bodyParser.json())
// app.use(cors())

// connect to mongodb
const dbURI = "mongodb+srv://futureproof:fppass@telegraph.ywckmek.mongodb.net/telegraph?retryWrites=true&w=majority"

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000, () => console.log(`\nExpress departing now from port 3000!\n`)))
  .catch(err => console.log(err));

// register view engine
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



   // mongoose & mongo tests
// app.get('/add-telegraph', (req, res) => {
//   const telegraph = new Telegraph({
//     title: 'new telegraph 2',
//     name: 'my name 2',
//     body: 'more about my new telegraph 2'
//   })

//   telegraph.save()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.get('/all-telegraphs', (req, res) => {
//   Telegraph.find()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

//   app.get('/single-telegraph', (req, res) => {
//     Telegraph.findById('6321a8575063b51d59bb5b44')
//       .then(result => {
//         res.send(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });
