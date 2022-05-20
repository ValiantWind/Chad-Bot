const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
      })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomquote')
		.setDescription('Replies with a random quote'),
  cooldown: 5000,
  category: 'Fun',
	async execute(interaction) {
		return getQuote().then(quote => interaction.reply(quote))
	},
};