const { MessageEmbed } = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      const dm = new MessageEmbed()
    .setTitle('New Winner!')
    .setColor('BLURPLE')
    .setDescription(`Hi ${member.user}\n The host has rerolled the giveaway you joined and you have won **[[This Giveaway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n Congratulations on Winning **${giveaway.prize}!**\nDirect Message the host to claim your prize! :D`)
    .setTimestamp()
    .setFooter({
        text: `${member.user.username}`, 
        iconURL: member.user.displayAvatarURL()
      });
      member.send({
        embeds: [dm]
      }).catch(e => {})
    });
  }
}