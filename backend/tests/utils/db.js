// followed https://dev.to/ryuuto829/setup-in-memory-database-for-testing-node-js-and-mongoose-1kop
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = async () => {
  // NOTE: before establishing a new connection close previous
  // await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();

  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts);
};

const close = async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
  await mongoServer.stop();
};

const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
};



module.exports = {
  connect,
  close,
  clear,
};
