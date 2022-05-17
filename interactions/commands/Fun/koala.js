const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('koala')
		.setDescription('Displays a random koala photo'),
  cooldown: 3000,
	async execute(interaction) {
		await interaction.deferReply();
    const res = await fetch('https://some-random-api.ml/img/koala');
    const img = (await res.json()).link;
    const color = getRoleColor(interaction.guild);
    const embed = new MessageEmbed()
    .setTitle(`Koala! :D`)
    .setImage(img)
    .setTimestamp()
    .setColor(color);
		interaction.editReply({ embeds: [embed] });
	},
};