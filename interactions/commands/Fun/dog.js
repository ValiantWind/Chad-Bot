const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('Displays a random dog photo'),
  cooldown: 3000,
	async execute(interaction) {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    const img = (await res.json()).link;
    const color = getRoleColor(interaction.guild);
    const embed = new MessageEmbed()
    .setTitle(`Doggy! :D`)
    .setImage(img)
    .setTimestamp()
    .setColor(color);
		interaction.reply({ embeds: [embed] });
	},
};