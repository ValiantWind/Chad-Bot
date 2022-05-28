const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setnick')
    .setDescription(`Allows a Staff Member with sufficient permissions to set the nickname of a member in the server.`)
    .addUserOption((option) => option
      .setName('target')
      .setDescription(`The user that you want to set the nickname of.`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('nickname')
      .setDescription(`The nickname you want to set for the user.`)
    .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/setnick <member> <new nickname>',
  async execute(interaction) {
    const user = interaction.options.getMember('target');
    const newNick = interaction.options.getString('nickname');

    if(!interaction.isCommand()) return;

if(interaction.member.roles.highest.comparePositionTo(user.roles.highest) <= 0){
      interaction.reply({ content: `Your roles must be higher than the roles of the person you want to set the nickname of.`, ephemeral: true });
} else {
  
      user.setNickname(newNick);
      let embed = new MessageEmbed()
    .setTitle("Success!")
    .setDescription(`Successfully set ${user.user.tag}'s nickname to ${newNick}`)
    .setColor('BLURPLE')
    .setTimestamp()
   await interaction.reply({embeds: [embed]})
}

   // let member = interaction.guild.members.cache.get(user.id);

   //  await member.setNickname(newNick)

   //  let embed = new MessageEmbed()
   //  .setTitle("Success!")
   //  .setDescription(`Successfully changed ${user.user.tag}'s nickname to ${newNick}`)
   //  .setColor('BLURPLE')
   //  .setTimestamp()
   // interaction.reply({embeds: [embed]})
  }
}