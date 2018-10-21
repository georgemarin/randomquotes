const { MongoClient } = require('mongodb');
const promiseRetry = require('promise-retry');

class DB {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    console.info('Connecting to MongoDB');

    try {
      const retryOptions = { maxTimeout: 5000 };
      const connectFunction = (retry, number) => {
        console.info(`Connection attempt ${number}`);
        return MongoClient.connect(
          'mongodb://user:password1@ds259111.mlab.com:59111/georgedb',
          { useNewUrlParser: true }
          ).catch(retry);
      };
      this.client = await promiseRetry(connectFunction, retryOptions);
      this.db = this.client.db('georgedb');
    } catch (err) {
      console.info(err.stack);
      process.exit(1);
    }

    console.info('Connected to MongoDB.');
  }

  close() {
    if (this.client) {
      this.client.close();
    }
  }
}

module.exports = {
  db: new DB(),
};
