const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('Displays a random dog photo'),
  cooldown: 3000,
  category: 'Fun',
  usage: '/dog',
	async execute(interaction) {

    if(!interaction.isCommand()) return;
    
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    const img = (await res.json()).message;

    const embed = new MessageEmbed()
    .setTitle(`Doggy! :D`)
    .setImage(img)
    .setTimestamp()
    .setColor('BLURPLE');
		interaction.reply({ embeds: [embed] });
	},
};