const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
  cooldown: 5000,
  category: 'Information',
  usage: '/ping',
	async execute(interaction) {

    if(!interaction.isCommand()) return;
    
    await interaction.deferReply();
    
		await interaction.editReply('Pong!');
	},
};