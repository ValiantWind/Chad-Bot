const { SlashCommandBuilder } = require('@discordjs/builders');
const { GuessThePokemon } = require('discord-gamecord');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokemon')
		.setDescription('Guess a random Pokemon on Discord!'),
        
	async execute(interaction) {
    new GuessThePokemon({
      message: interaction,
      slash_command: true,
      embed: {
        title: 'Who\'s that Pokemon?',
        footer: 'You have only 1 chance',
        color: '#5865F2',
      },
      time: 30000,
      thinkMessage: '**Thinking...**',
      winMessage: 'Correct! The pokemon was **{pokemon}**',
      stopMessage: 'You ran out of time! The pokemon was **{pokemon}**',
      incorrectMessage: 'Incorrect! The pokemon was actually**{pokemon}**',
    }).startGame();
	},  
};