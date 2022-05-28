const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const modstatsdb = require('quick.db');
const bandb = require('../../../models/bandb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delban')
    .setDescription(`Allows a Staff Member with sufficient permissions to remove a ban log from a member in the server .`)
    .addStringOption((option) => option
      .setName('banid')
      .setDescription('ID of the modlog you want to delete')
      .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/delban <ban id>',
  async execute(interaction) {
   const banId = interaction.options.getString('banid');

    if(!interaction.isCommand()) return;

    const data = await bandb.findById(banId);
    if(!data) return interaction.reply({
      content: `${banId} is not a valid id!`
    });
    data.delete();

    const user = interaction.guild.members.cache.get(data.userId);
    
    return interaction.reply({
      content:  `Successfully removed the ban log from ${user.user.tag}.`
    });

  },
}; 