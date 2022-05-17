const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('channelinfo')
    .setDescription(`Gets Info about a channel in the server`)
    .addChannelOption((option) => option
      .setName('channel')
      .setDescription('channel to get the info of')
      .setRequired(true),
    ),
  cooldown: 5000,
 async execute(interaction) {
   const channel = interaction.options.getChannel('channel');
   const color = getRoleColor(interaction.guild)
		const embed = new MessageEmbed().setTitle(`${channel.name} Info`);
		if (channel.isText && channel.topic) {
			embed.setDescription(channel.topic);
		}
		if (channel.rateLimitPerUser) {
			embed.addField('Slow Mode:', `${channel.rateLimitPerUser} Secounds`, true);
		}
		if (channel.parent) {
			embed.addField('Catgory Name:', channel.parent.name);
		}
		if (channel.lastPinTimestamp) {
			embed.addField('Last Pin Message At:', `<t:${Math.floor(channel.lastPinTimestamp / 1000)}:R>`, true);
		}
		let channelTypes;
		switch (channel.type) {
			case 'GUILD_TEXT':
				channelTypes = 'Text Channel';
				break;
			case 'GUILD_VOICE':
				channelTypes = 'Voice Channel';
				break;
			case 'GUILD_CATEGORY':
				channelTypes = 'Category Channel';
				break;
			case 'GUILD_NEWS':
				channelTypes = 'News Channel';
				break;
			case 'GUILD_STORE':
				channelTypes = 'Store Channel';
				break;
			case 'GUILD_NEWS_THREAD':
				channelTypes = 'News Thread Channel';
				break;
			case 'GUILD_PUBLIC_THREAD':
				channelTypes = 'Public Thread Channel';
				break;
			case 'GUILD_PRIVATE_THREAD':
				channelTypes = 'Private Thread Channel';
				break;
			case 'GUILD_STAGE_VOICE':
				channelTypes = 'Stage Channel';
				break;
		}
		embed.addField('Channel Type:', channelTypes, true);
		embed.addField('Channel Created At:', `<t:${Math.floor(channel.createdTimestamp / 1000)}:R>`, true);
		embed.setColor(color);
		embed.setFooter(channel.id);
		interaction.reply({
			embeds: [embed],
		});
  }
}