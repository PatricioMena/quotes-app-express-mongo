const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const PORT = 3000;
require('dotenv').config();

// Connecting to DB
let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'quotes-app';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to Database');
    db = client.db(dbName);

    // Setup server //
    // telling express we're using ejs as template engine
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    // Instead of body parser. Express doesn't handle reading data from the <form>
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get('/', (req, res) => {
      db.collection('quotes')
        .find()
        .toArray()
        .then((data) =>
          // rendering the html
          res.render('index.ejs', { info: data })
        )
        .catch((err) => console.error(err));
    });

    app.post('/quotes', (req, res) => {
      db.collection('quotes')
        .insertOne(req.body)
        .then((result) => {
          res.redirect('/');
        })
        .catch((err) => console.error(err));
    });

    app.listen(process.env.PORT || PORT, () =>
      console.log(`Your server is running on port ${3000}`)
    );
  })
  .catch((error) => console.error(error));
