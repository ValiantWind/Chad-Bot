const { MessageEmbed } = require('discord.js');
const { getRoleColor } = require('../../../utils/getRoleColor');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emojis')
		.setDescription('Displays all the emojis in the server'),
  cooldown: 5000,
  category: 'Information',
	async execute(interaction) {
		const emojis = interaction.guild.emojis.cache.map((r) => r).join(' ');
    const color = getRoleColor(interaction.guild);
		const embed = new MessageEmbed()
			.setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
			.setTitle(
				`${interaction.guild.emojis.cache.filter((r) => r.animated === false).size} Emotes, ${
					interaction.guild.emojis.cache.filter((r) => r.animated).size
				} Animated (${interaction.guild.emojis.cache.size} Total)`,
			)
			.setDescription(emojis.toString())
			.setColor(color)
      .setTimestamp()
		return interaction.reply({ embeds: [embed] });
	},
};