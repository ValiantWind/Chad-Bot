const { Client } = require("discord.js");
const mongoose = require('mongoose');

module.exports = async (client) => {

   const mongooseConnectionString = process.env.mongooseConnectionString;
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }).then(() => console.log('✔️ MongoDB'));
}

  