const express = require('express');
const { db } = require('../lib/db');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/quote', async (req, res) => {
  try {
    await db.db.collection('quotes').createIndex({ quote: 1, author: 1 }, { unique: true });
    const response = await db.db.collection('quotes').insertOne({
      quote: req.body.quote,
      author: req.body.author,
    });
    delete response.ops[0]._id;
    res.send(response.ops[0]);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/quotes', async (req, res) => {
  console.log(req.body);
  try {
    await db.db.collection('quotes').createIndex({ quote: 1, author: 1 }, { unique: true });
    const response = await db.db.collection('quotes').insertMany(req.body.quotes);
    res.send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/quotes', async (req, res) => {
  try {
    const response = await db.db.collection('quotes').find().toArray();
    response.forEach(quote => delete quote._id);
    res.send({ quotes: response});
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = router;
