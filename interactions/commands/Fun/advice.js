const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('advice')
		.setDescription('Gives you some random advice'),
  cooldown: 3000,
  category: 'Fun',
	async execute(interaction) {
    const res = await fetch('https://api.adviceslip.com/advice');
    const advice = (await res.json()).slip.advice;
    interaction.reply({content: advice})
	},
};