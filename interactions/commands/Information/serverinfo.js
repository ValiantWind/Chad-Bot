const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription(`Displays information about the server you're in.`),
  cooldown: 3000,
  category: 'Information',
  usage: '/serverinfo',
  async execute(interaction) {

    if(!interaction.isCommand()) return;
    
    let color = getRoleColor(interaction.guild);
    const ownerId = interaction.guild.ownerId;
    const serverInfoEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle('Server Information')
      .addFields(
        { name: 'Server Name', value: `${interaction.guild.name}` },
        { name: 'Server ID', value: `${interaction.guild.id}` },
        { name: 'Server Description', value: `${interaction.guild.description || 'No Description'}` },
        { name: 'Total Members', value: `${interaction.guild.memberCount}` },
        { name: 'Owner', value: `<@${ownerId}>` },
        { name: 'Created At', value: `${moment(interaction.guild.createdTimestamp).format('LT')} ${moment(interaction.guild.createdTimestamp).format('LL')} (${moment(interaction.guild.createdTimestamp).fromNow()})` },
        { name: 'Role Count', value: `${interaction.guild.roles.cache.size}` },
        { name: 'Channel Count', value: `${interaction.guild.channels.cache.size}` },
        { name: 'Custom Emoji Count', value: `${interaction.guild.emojis.cache.size}` },
        { name: 'Boost Count', value: `${interaction.guild.premiumSubscriptionCount || '0'}` },
        { name: 'Verified?', value: `${interaction.guild.verified}` },
        { name: 'Partnered?', value: `${interaction.guild.partnered}` }
      )
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setTimestamp();
    interaction.reply({ embeds: [serverInfoEmbed] });
  }
}