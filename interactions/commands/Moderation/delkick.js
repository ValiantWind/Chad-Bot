const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const modstatsdb = require('quick.db');
const kickdb = require('../../../models/kickdb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delkick')
    .setDescription(`Allows a Staff Member with sufficient permissions to remove a kick-log from a member in the server .`)
    .addStringOption((option) => option
      .setName('kickid')
      .setDescription('ID of the modlog you want to delete')
      .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/delkick <kick id>',
  async execute(interaction) {

    if(!interaction.isCommand()) return;
    
   const kickId = interaction.options.getString('kickid');


    const data = await kickdb.findById(kickId);
    if(!data) return interaction.reply({
      content: `${kickId} is not a valid id!`
    });
    data.delete();

    const user = interaction.guild.members.cache.get(data.userId);
    
    return interaction.reply({
      content:  `Successfully removed the kick from ${user.user.tag}.`
    });

  },
}; 