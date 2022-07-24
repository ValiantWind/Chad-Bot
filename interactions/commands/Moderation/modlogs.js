const { EmbedBuilder, InteractionType } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const warndb = require('../../../models/warndb');
const mutedb = require('../../../models/mutedb');
const kickdb = require('../../../models/kickdb');
const bandb = require('../../../models/bandb');
const moment = require('moment');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('modlogs')
    .setDescription(`Displays the number of modlogs a user has.`)
    .addStringOption((option) => option
      .setName('userid')
      .setDescription(`The userid of the user you want to view the modlogs of.`)
      .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/modlogs <member>',
  async execute(interaction) {
    if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    

    const options = interaction.options;

      const target = options.get('userid')?.value;

    if(!target){
      const userId = interaction.user.id;
      const userWarnings = await warndb.find({      
      userId: userId,
      guildId: interaction.guildId
    })
    const userMutes = await mutedb.find({
      //userId: user.id,
      userId: userId,
      guildId: interaction.guildId
    })
    const userKicks = await kickdb.find({
      userId: userId,
      //userId: user.id,
      guildId: interaction.guildId
    })
    const userBans = await bandb.find({
      userId: userId,
      //userId: user.id,
      guildId: interaction.guildId
    })
    if(!userWarnings?.length && !userMutes?.length && !userKicks?.length && !userBans?.length) return interaction.reply({content: `${interaction.user.tag} has no infractions in this server.`});
    

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
          `Duration: ${mute.duration}`,
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
        }).join("\n\n");

    const totalModlogs = userWarnings?.length + userMutes?.length + userKicks?.length + userBans?.length
       const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.tag}'s ModLogs`)
      .setDescription(`Total ModLogs: ${totalModlogs}`)
      .addFields(
        {name: 'Warnings', value: warnField || 'No Warnings'},
        {name: 'Mutes', value: muteField || 'No Mutes'},
        {name: 'Kicks', value: kickField || 'No Kicks'},
        {name: 'Bans', value: banField || 'No Bans'}
      )
      // .addField('Warnings', warnField || 'No Warnings')
      // .addField('Mutes', muteField || 'No Mutes')
      // .addField('Kicks', kickField || 'No Kicks')
      // .addField('Bans', banField || 'No Bans')
      .setFooter(`${totalModLogs} Total Modlogs`)
      .setColor('BLURPLE')

    interaction.reply({embeds: [embed]})
    
    } else {
  const userWarnings = await warndb.find({      
     // userId: user.id,
      userId: target,
      guildId: interaction.guildId
    })
    const userMutes = await mutedb.find({
      //userId: user.id,
      userId: target,
      guildId: interaction.guildId
    })
    const userKicks = await kickdb.find({
      userId: target,
      //userId: user.id,
      guildId: interaction.guildId
    })
    const userBans = await bandb.find({
      userId: target,
      //userId: user.id,
      guildId: interaction.guildId
    })
    
    if(!userWarnings?.length && !userMutes?.length && !userKicks?.length && !userBans?.length) return interaction.reply({content: `<@${target}> has no infractions in this server.`});
    

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
          `Duration: ${mute.duration}`,
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
        }).join("\n\n");

    const totalModlogs = userWarnings?.length + userMutes?.length + userKicks?.length + userBans?.length
       const embed = new EmbedBuilder()
      .setTitle(`<@${target}>'s ModLogs`)
      .setDescription(`Total ModLogs: ${totalModlogs}`)
         .addFields(
        {name: 'Warnings', value: warnField || 'No Warnings'},
        {name: 'Mutes', value: muteField || 'No Mutes'},
        {name: 'Kicks', value: kickField || 'No Kicks'},
        {name: 'Bans', value: banField || 'No Bans'}
      )
      // .addField('Warnings', warnField || 'No Warnings')
      // .addField('Mutes', muteField || 'No Mutes')
      // .addField('Kicks', kickField || 'No Kicks')
      // .addField('Bans', banField || 'No Bans')
      .setColor('BLURPLE')

    interaction.reply({embeds: [embed]})
  
    }
  }
}