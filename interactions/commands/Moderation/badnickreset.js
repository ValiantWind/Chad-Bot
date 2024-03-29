const { EmbedBuilder, InteractionType, PermissionFlagsBits } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('badnickreset')
    .setDescription(`Allows a Staff Member with sufficient permissions to reset the nickname of a member in the server.`)
    .addUserOption((option) => option
      .setName('target')
      .setDescription(`The user that you want to reset the nickname of.`)
      .setRequired(true)
    )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/badnickreset <member>',
  async execute(interaction) {

   if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
    
    const user = interaction.options.getMember('target');

if(interaction.member.roles.highest.comparePositionTo(user.roles.highest) <= 0){
      interaction.reply({ content: `Your roles must be higher than the roles of the person you want to change the nickname of.`, ephemeral: true });
} else {
  
      user.setNickname('Inappropriate Nickname');
      let embed = new EmbedBuilder()
    .setTitle("Success!")
    .setDescription(`Successfully changed ${user.user.tag}'s nickname.`)
    .setColor('BLURPLE')
    .setTimestamp()
   await interaction.reply({embeds: [embed]})
}
  }
}
