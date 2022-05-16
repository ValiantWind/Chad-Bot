const { Client } = require("discord.js");
const mongoose = require('mongoose');

module.exports = async (client) => {

   const mongooseConnectionString = process.env.mongooseConnectionString;
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => console.log('✔️ MongoDB'));
}

  