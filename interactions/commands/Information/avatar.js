const { MessageEmbed, MessageAttachment } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription(`Displays a user's avatar`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription('The user you want to view info about.')
    ),
  category: 'Information',
  cooldown: 3000,
 async execute(interaction) {
   const member = interaction.options.getMember('user');
  const color = getRoleColor(interaction.guild)
   if(!member){
   const selfembed = new MessageEmbed()
      .setTitle(`${interaction.member.displayName}'s Avatar`)
      .setImage(interaction.member.user.displayAvatarURL({ dynamic: true, size:  1024 }))
      .setTimestamp()
      .setColor(color);
     interaction.reply({ embeds: [selfembed] });
   } else {
     const embed = new MessageEmbed()
      .setTitle(`${member.displayName}'s Avatar`)
      .setImage(member.user.displayAvatarURL({ dynamic: true, size:  1024 }))
      .setFooter(member.displayName,  interaction.member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(color);
     interaction.reply({ embeds: [embed] });
   }
  }
}