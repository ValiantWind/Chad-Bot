const mongoose = require('mongoose');

module.exports = mongoose.model('RobloxProfile', 
    new mongoose.Schema({
    userId: String,
    guildId: String,
    robloxUsername: String, 
    robloxUserId: String,
  })                        
)

