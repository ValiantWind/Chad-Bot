const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('puppy')
		.setDescription('Displays a link to a cute puppy video.'),
  cooldown: 5000,
  category: 'Fun',
  usage: "/puppy",
	async execute(interaction) {
    
    if(!interaction.isCommand()) return;
    
		return interaction.reply('https://valiantwind.me/puppy');
	},
};