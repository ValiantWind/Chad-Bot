const { MessageEmbed } = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      const dm = new MessageEmbed()
          .setTitle(`You Won!`)
          .setColor("BLURPLE")
          .setDescription(`HI ${member.user}\nYyou have won **[[This Giveaway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n Congratulations On Winning **${giveaway.prize}!**\nDM the host to claim your prize!`)
          .setTimestamp()
          .setFooter({
            text: `${member.user.username}`, 
            iconURL: member.user.displayAvatarURL()
           })
      member.send({
        embeds: [dm]
      }).catch(e => {})
    });

  }
}