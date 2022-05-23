const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const warndb = require('../../../models/warndb')
const modstatsdb = require('quick.db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removewarn')
    .setDescription(`Allows a Staff Member with sufficient permissions to remove a warn from a member in the server .`)
    .addStringOption((option) => option
      .setName('warnid')
      .setDescription('ID of the warn you want to delete')
      .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  async execute(interaction) {
   const warnId = interaction.options.getString('warnid');

    const data = await warndb.findById(warnId);

    if(!data) return interaction.followUp({
      content: `${warnId} is not a valid id!`
    });
    
    data.delete()

    const user = interaction.guild.members.cache.get(data.userId);
    modstatsdb.subtract(`warnModstats_${interaction.member.user.id}`, 1)
    modstatsdb.subtract(`totalModstats_${interaction.member.user.id}`, 1)
    return interaction.reply({
      content:  `Successfully removed 1 of ${user}'s warnings.`
    });
     
  },
};