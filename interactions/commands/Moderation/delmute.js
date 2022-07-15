const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const warndb = require('../../../models/warndb')
const modstatsdb = require('quick.db');
const mutedb = require('../../../models/mutedb');
const kickdb = require('../../../models/kickdb');
const bandb = require('../../../models/bandb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delmute')
    .setDescription(`Allows a Staff Member with sufficient permissions to remove a mute from a member in the server .`)
    .addStringOption((option) => option
      .setName('muteid')
      .setDescription('ID of the modlog you want to delete')
      .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/delmute <mute id>',
  async execute(interaction) {

    if(!interaction.isCommand()) return;
    
   const muteId = interaction.options.getString('muteid');

    const data = await mutedb.findById(muteId);
    if(!data) return interaction.reply({
      content: `${muteId} is not a valid id!`
    });
    data.delete();

    const user = interaction.guild.members.cache.get(data.userId);
    
    return interaction.reply({
      content:  `Successfully removed the mute log from ${user.user.tag}.`
    });

  },
}; 