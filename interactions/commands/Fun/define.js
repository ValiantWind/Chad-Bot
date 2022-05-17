const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('define')
		.setDescription('Searches up a term of your choice in the dictionary')
    .addStringOption((option) => option
      .setName('term')
      .setDescription('Term you want to search up')
      .setRequired(true)
      ),
  cooldown: 3000,
	async execute(interaction) {
		await interaction.deferReply();
    const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

    const term = interaction.options.getString('term')
    const query = new URLSearchParams({ term });
    const color = getRoleColor(interaction.guild)

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
			.then(response => response.json());

    if (!list.length) {
		return interaction.editReply(`No results found for **${term}**.`);
	}

    const [answer] = list;

const embed = new MessageEmbed()
	.setColor(color)
	.setTitle(answer.word)
	.setURL(answer.permalink)
	.addFields(
		{ name: 'Definition', value: trim(answer.definition, 1024) },
		{ name: 'Example', value: trim(answer.example, 1024) },
		{ name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
	);

interaction.editReply({ embeds: [embed] });
	},
};