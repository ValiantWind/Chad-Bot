const { MessageManager, Message } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
    const { client } = interaction;

    const command = client.commands.get(interaction.commandName);
    
		console.log(`${interaction.user.tag} triggered the ${command.data.name} command in #${interaction.channel.name} in ${interaction.guild.name}`);
	},
};