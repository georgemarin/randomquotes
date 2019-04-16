const express = require('express');
const { db } = require('../lib/db');
const mongo = require('mongodb');
const router = express.Router();

router.get('/express', (req, res) => {
  res.render('index', { title: 'Express' });
});

/**
 * Save a quote
 */
router.post('/quote', async (req, res) => {
  try {
    await db.db.collection('quotes').createIndex({ quote: 1, author: 1 }, { unique: true });
    const response = await db.db.collection('quotes').insertOne({
      quote: req.body.quote,
      author: req.body.author,
      likes: req.body.likes,
    });
    delete response.ops[0]._id;
    res.send(response.ops[0]);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * Save multiple quotes
 */
router.post('/quotes', async (req, res) => {
  try {
    await db.db.collection('quotes').createIndex({ quote: 1, author: 1 }, { unique: true });
    await db.db.collection('quotes').insertMany(req.body.quotes);
    res.send({ success: true });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/quote/:id', async (req, res) => {
  try {
    const _id = new mongo.ObjectID(req.params.id);
    await db.db.collection('quotes').findOneAndDelete({ _id });
    res.status(200).send({ success: true });
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * Updates a quote
 */
router.put('/quote/:id', async(req, res) => {
  try {
    const _id = new mongo.ObjectID(req.params.id);
    const response = await db.db.collection('quotes').findOneAndReplace({ _id }, req.body.quote);
    res.send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * Get all quotes
 */
router.get('/quotes', async (req, res) => {
  try {
    const response = await db.db.collection('quotes').find().toArray();
    res.send({ quotes: response});
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * Get a random quote
 */
router.get('/quote', async (req, res) => {
  try {
    const collection = await db.db.collection('quotes');
    const count = await collection.count();
    const r = Math.floor(Math.random() * count);
    const response = await collection.find().limit(1).skip(r).toArray();
    res.send({ quote: response[0] });
  } catch (e) {
    res.status(500).send(e);
  }
});



module.exports = router;
