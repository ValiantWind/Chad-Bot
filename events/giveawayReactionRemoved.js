const { MessageEmbed } = require("discord.js")

module.exports = {
  async execute(giveaway, member) {
    const dm = new MessageEmbed()
      .setTitle('Entry Removed!')
      .setDescription(`Your entry to [this Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) has been removed!`)
      .setColor('BLURPLE')
      .setTimestamp()
    return member.send({
      embeds: [dm]
    }).catch(e => {})
  }
}