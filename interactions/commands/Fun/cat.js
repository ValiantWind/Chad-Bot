const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Displays a random cat photo'),
  cooldown: 3000,
	async execute(interaction) {
     const { message } = await fetch('https://aws.random.cat/meow').then(response => response.json());
    const color = getRoleColor(interaction.guild);
    const embed = new MessageEmbed()
    .setTitle(`Kitty! :D`)
    .setImage(message)
    .setTimestamp()
    .setColor(color);
		interaction.reply({ embeds: [embed] });
	},
};