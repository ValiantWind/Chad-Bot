const { MessageEmbed } = require("discord.js");

module.exports = {
  async execute(giveaway, reactor, messageReaction) {
    
    let approved =  new MessageEmbed()
    .setTimestamp()
    .setColor('BLURPLE')
    .setTitle("Entry Approved!")
    .setDescription(
      `Your entry to [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) has been approved!`
    )
    .setTimestamp()
   let denied =  new MessageEmbed()
    .setTimestamp()
    .setColor('BLURPLE')
    .setTitle("Entry Denied!")
    .setDescription(
      `Your entry to [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) has been denied. Please review the requirements to enter the giveaway.`
    )

    let client = messageReaction.message.client
    if (reactor.user.bot) return;
    if(giveaway.extraData) {
      if (giveaway.extraData.server !== "null") {
        try { 
        await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id)
        return reactor.send({
          embeds: [approved]
        });
        } catch(e) {
          messageReaction.users.remove(reactor.user);
          return reactor.send({
            embeds: [denied]
          }).catch(e => {})
        }
      }
      if (giveaway.extraData.role !== "null" && !reactor.roles.cache.get(giveaway.extraData.role)){ 
        messageReaction.users.remove(reactor.user);
        return reactor.send({
          embeds: [denied]
        }).catch(e => {})
      }

      return reactor.send({
        embeds: [approved]
      }).catch(e => {})
    } else {
        return reactor.send({
          embeds: [approved]
        }).catch(e => {})
    }
    }
  }