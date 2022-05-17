const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
  cooldown: 5000,
	async execute(interaction) {
		return interaction.reply('Pong!');
	},
};