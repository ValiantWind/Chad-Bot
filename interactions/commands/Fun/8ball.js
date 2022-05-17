const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription(`Honestly just search up what a Magic 8-ball is lmao`)
    .addStringOption((option) => option
      .setName('question')
      .setDescription('The question you want to ask to the 100% reliable Magic 8-Ball.')
    ),
  cooldown: 3000,
  execute(interaction) {
    let color = getRoleColor(interaction.guild);
    const question = interaction.options.getString('question');
    let replies = [
			"Yes, of course",
			"Perhaps not",
			"Definitely not",
      "Definitely",
			"This might be good",
      "Reply hazy, try again later",
      "Maybe, maybe not",
      "Of course not dumbo",
		]
    let random = Math.floor(Math.random() * replies.length);

    return interaction.reply(`The Magic 8-Ball Says: ${replies[random]}, <@${interaction.member.id}>.`)  
  }
}