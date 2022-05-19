const { SlashCommandBuilder } = require('@discordjs/builders');
const { Trivia } = require('discord-gamecord');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Play Trivia on Discord!'),
  cooldown: 10000,
  category: 'Fun',
	async execute(interaction, client) {
        new Trivia({
            message: interaction,
            slash_command: true,
            embed: {
              title: 'Trivia',
              description: 'You have {time} seconds to respond!',
              color: '#5865F2',
            },
            difficulty: 'medium',
            winMessage: 'Correct! The answer was **{answer}**',
            loseMessage: 'Incorrect! The correct answer was **{answer}**',
            othersMessage: 'Nice try.',
        }).startGame();
	},  
};