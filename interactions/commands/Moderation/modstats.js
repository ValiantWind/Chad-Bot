const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const modstatsdb = require('quick.db');
const requiemId = process.env.requiemId

module.exports = {
  data: new SlashCommandBuilder()
    .setName('modstats')
    .setDescription(`Displays the number of warnings a user has.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to view the modstats of.`)
      .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/modstats <member>',
  async execute(interaction) {
    const author = interaction.member.user.username;
    const member = interaction.options.getMember('user') || author;

    if(!interaction.isCommand()) return;
    
    const color = getRoleColor(interaction.guild)
    let totalModstats = modstatsdb.fetch(`totalModstats_${member.id}`)
    let kickModstats = modstatsdb.fetch(`kickModstats_${member.id}`)
    let banModstats = modstatsdb.fetch(`banModstats_${member.id}`)
    let warnModstats = modstatsdb.fetch(`warnModstats_${member.id}`)
    let muteModstats = modstatsdb.fetch(`muteModstats_${member.id}`)
    if(kickModstats == null ){ 
      kickModstats = 0;
    }
    if(banModstats == null){
      banModstats = 0;
    }
    if(warnModstats == null){
      warnModstats = 0;
    }
    if(muteModstats == null){
      muteModstats = 0;
    }
    if(totalModstats == null){
      totalModstats = 0;
    }
    
    let embed = new MessageEmbed()
        .setTitle(`Modstats of ${member.tag || member.user.tag}`)
        .setDescription(`Total Mod Stats: ${totalModstats}`)
        .addField('Total Warn Mod Stats: ', warnModstats.toString(), true)
        .addField('Total Mute Mod Stats: ', muteModstats.toString(), true)
        .addField('Total Kick Mod Stats: ', kickModstats.toString(), true)
        .addField('Total Ban Mod stats', banModstats.toString(), true)
        .setTimestamp()
        .setColor(color)
    interaction.reply({ embeds: [embed] })
  }
}