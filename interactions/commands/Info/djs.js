const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('djs')
    .setDescription(`Searches the Discord.js Documentation`)
    .addUserOption((option) => option
      .setName('term')
      .setDescription('Term to search in the documentation')
      .setRequired(true),
    ),
  cooldown: 5000,
 async execute(interaction) {
   const query = interaction.options.getString('query');
		try {
			const req = await axios.get(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`);
			const data = req.data;
			if (data && !data.error) {
				interaction.reply({ embeds: [data] });
			} else {
				return interaction.rpely({ content: `:x: There was an error`, ephemeral: true });
			}
		} catch (e) {
			return interaction.reply({ content: e, ephemeral: true });
		}
  }
}