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
  usage: '/avatar <member (optional)>',
 async execute(interaction) {
   const member = interaction.options.getMember('user') || interaction.user;

   if(!interaction.isCommand()) return;
  const color = getRoleColor(interaction.guild)
     const embed = new MessageEmbed()
      .setTitle(`${member.tag || member.user.tag}'s Avatar`)
      .setImage(member.displayAvatarURL({ dynamic: true, size:  1024 }))
      .setTimestamp()
      .setColor(color);
     interaction.reply({ embeds: [embed] });
  }
}