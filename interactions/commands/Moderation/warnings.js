const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const db = require('quick.db');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription(`Displays the number of warnings a user has.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to view the warns of.`)
      .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  async execute(interaction) {
    const author = interaction.member.user.username;
    const member = interaction.options.getMember('user') || author;
    const color = getRoleColor(interaction.guild)
    let warns = await db.fetch(`warns_${member.id}`)
    if(warns == null){ 
      warns = 0;
    }
    let embed = new MessageEmbed()
        .setTitle(`Warnings of ${member.tag || member.user.tag}`)
        .setDescription(`Total Warnings: ${warns}`)
        .setTimestamp()
        .setColor(color)
    interaction.reply({ embeds: [embed] })
  }
}