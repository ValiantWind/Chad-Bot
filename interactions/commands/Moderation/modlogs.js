const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const warndb = require('../../../models/warndb');
const mutedb = require('../../../models/mutedb');
const kickdb = require('../../../models/kickdb');
const bandb = require('../../../models/bandb');
const moment = require('moment');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('modlogs')
    .setDescription(`Displays the number of modlogs a user has.`)
    .addUserOption((option) => option
      .setName('member')
      .setDescription(`The user that you want to view the modlogs of.`)
      .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  async execute(interaction) {
    const user = interaction.options.getMember('member');
        
    const userWarnings = await warndb.find({      
      userId: user.id,
      guildId: interaction.guildId
    })
    const userMutes = await mutedb.find({
      userId: user.id,
      guildId: interaction.guildId
    })
    const userKicks = await kickdb.find({
      userId: user.id,
      guildId: interaction.guildId
    })
    const userBans = await bandb.find({
      userId: user.id,
      guildId: interaction.guildId
    })
    
    if(!userWarnings?.length && !userMutes?.length && !userKicks?.length && !userBans?.length) return interaction.reply({content: `${user} has no infractions in this server.`})
    

    const warnField = userWarnings.map((warn) => {
      const warnModerator = interaction.guild.members.cache.get(warn.moderatorId);

      return [
        `warnId: ${warn._id}`,
        `Moderator: ${warnModerator || 'Has Left'}`,
        `Date: ${moment(warn.timestamp).format("MMMM Do YYYY")}`,
        `Reason: ${warn.reason}`,
      ].join("\n")    
    })
    .join("\n\n");
    const muteField = userMutes.map((mute) => {
        const muteModerator = interaction.guild.members.cache.get(mute.moderatorId);

        return [
          `muteId: ${mute._id}`,
          `Moderator: ${muteModerator || 'Has Left'}`,
          `Date: ${moment(mute.timestamp).format("MMMM Do YYYY")}`,
          `Reason: ${mute.reason}`,
        ].join("\n")
        }).join("\n\n")
    const kickField = userKicks.map((kick) => {
        const kickModerator = interaction.guild.members.cache.get(kick.moderatorId);

        return [
          `kickId: ${kick._id}`,
          `Moderator: ${kickModerator || 'Has Left'}`,
          `Date: ${moment(kick.timestamp).format("MMMM Do YYYY")}`,
          `Reason: ${kick.reason}`,
        ].join("\n")
        }).join("\n\n");
    const banField = userBans.map((ban) => {
        const banModerator = interaction.guild.members.cache.get(ban.moderatorId);

        return [
          `banId: ${ban._id}`,
          `Moderator: ${banModerator || 'Has Left'}`,
          `Date: ${moment(ban.timestamp).format("MMMM Do YYYY")}`,
          `Reason: ${ban.reason}`,
        ].join("\n")
        }).join("\n\n")
    const color = getRoleColor(interaction.guild);
       const embed = new MessageEmbed()
      .setTitle(`${user.user.tag}'s ModLogs`)
      .setDescription(`Self-Explanatory Command`)
      .addField('Warnings', warnField || 'No Warnings')
      .addField('Mutes', muteField || 'No Mutes')
      .addField('Kicks', kickField || 'No Kicks')
      .addField('Bans', banField || 'No Bans')
      .setColor(color)

    interaction.reply({embeds: [embed]})
    
  }
  
}