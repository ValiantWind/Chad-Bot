const { SlashCommandBuilder } = require('@discordjs/builders');
const { Snake } = require('discord-gamecord');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snake')
		.setDescription('Start a game of Snake!'),
  cooldown: 10000,
  category: 'Fun',
  usage: '/snake',
	async execute(interaction) {

    if(!interaction.isCommand()) return;
    
    new Snake({
      message: interaction,
      slash_command: true,
      embed: {
        title: 'Snake',
        color: '#5865F2',
        overTitle: 'Game Over',
      },
      snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
      emojis: {
        board: '⬛', 
        food: '🍎',
        up: '⬆️', 
        right: '➡️',
        down: '⬇️',
        left: '⬅️',
      },
      foods: ['🍎', '🍇', '🍊'],
      stopButton: 'Stop',
      othersMessage: 'You are not allowed to use buttons for this message!',
    }).startGame();
	},  
};