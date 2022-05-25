const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fact')
		.setDescription("Gives you a random and most likely useless fact."),
  cooldown: 3000,
  category: 'Fun',
	async execute(interaction) {
    const color = getRoleColor(interaction.guild)
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    await response.json().then(res => {
      interaction.reply({
        embeds: [new MessageEmbed()
    .setTitle('Your Useless Fact')
    .setDescription(res.text)
    .setColor(color)]
      });
    });
	},
};