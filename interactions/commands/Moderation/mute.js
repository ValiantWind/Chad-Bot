const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const modstatsdb = require('quick.db');
const mutedb = require('../../../models/mutedb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription(`Restricts a user from sending messages.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to mute.`)
      .setRequired(true)
    )
    .addNumberOption((option) => option
      .setName('minutes')
      .setDescription(`The amount of minutes that you want the user to stay muted.`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're muting this user for.`)
      .setRequired(true)
    ),
  cooldown: 3000,
  category: 'Moderation',
  usage: '/mute <member> <duration (in minutes)> <reason>',
  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const mins = interaction.options.getNumber('minutes');
    const reason = interaction.options.getString('reason') || 'No reason provided.'
    const author = interaction.member.user.username;
    let mutedRole = interaction.guild.roles.cache.find((r) => r.name === 'Muted');
    if (mins > 720 || mins <= 0) {
      return interaction.reply({ content: `Minutes must be a positive number lower than 720.`, ephemeral: true });
    }

    if (member.id == interaction.member.user.id) {
      return interaction.reply({ content: `Stupid mod. You can't mute youself. Why would you even want to do that lol`, ephemeral: true });
    }

    if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
      return interaction.reply({ content: `Your roles must be higher than the roles of the person you want to mute!`, ephemeral: true });
    }
new mutedb({
    userId: member.id,
    guildId: interaction.guildId,
    moderatorId: interaction.user.id,
    duration: mins,
    reason,
    timestamp: Date.now(),
    
  }).save();
    
    if (!mutedRole) {
      const newMutedRole = await interaction.guild.roles.create({
        name: 'Muted',
        permissions: []
      });
      interaction.guild.channels.cache.forEach(async (channel) => {
        await channel.permissionOverwrites.edit(newMutedRole, {
          'SEND_MESSAGES': false,
          'ADD_REACTIONS': false,
          'SPEAK': false
        });
      });
      mutedRole = newMutedRole;
    }

    if (member.roles.cache.has(mutedRole.id)) {
      return interaction.reply({ content: `${member.username} is already muted!`, ephemeral: true });
    }


     let color = getRoleColor(interaction.guild);
    const muteEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(`**Muted!**`)
      .setDescription(`***Successfully muted ***${member}! || ${reason} `)
      .setFooter('Imagine being muted lol')
      .setTimestamp();
    
    const millisecondsPerMinute = 60 * 1000;
    let MuteInfo = {};
    MuteInfo.userID = member.id;
    MuteInfo.unmuteDate = Date.now() + mins * millisecondsPerMinute;
    MuteInfo.author = author;
    let msg = `${author} has muted you from ${interaction.guild.name} for ${reason}. Duration: ${mins} minutes.`;

    if (!member.user.bot) member.send({ content: msg });

   member.roles.add(mutedRole); modstatsdb.add(`muteModstats_${interaction.member.user.id}`, 1)
    modstatsdb.add(`totalModstats_${interaction.member.user.id}`, 1)
  await interaction.reply({embeds: [muteEmbed]})
  }
}