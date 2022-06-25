const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription(`Displays information about a Discord User.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription('The user you want to view info about.')
    ),
  cooldown: 3000,
  category: 'Information',
  usage: '/userinfo <member (optional)>',
  async execute(interaction) {

    if(!interaction.isCommand()) return;
    
    let color = getRoleColor(interaction.guild);
    const member = interaction.options.getMember('user');
    
    let userInfoEmbed;
    if (!member) {
      const roles = '```' + interaction.member.roles.cache.map((role) => role.name).join(`, `) + '```';
      const perms = '```' + interaction.member.permissions.toArray().join(`, `) + '```';
      let badges = '```' + interaction.member.user.flags.toArray().join(', ') + '```';
      if (badges === '``````') badges = '```None```';
      userInfoEmbed = new MessageEmbed()
        .setColor(color)
        .setTitle('User Information')
        .addFields(
          { name: 'Username:', value: `${interaction.member.user.tag}` },
          { name: 'User ID:', value: `${interaction.member.user.id}` },
          { name: 'Account Since:', value: `${moment(interaction.member.user.createdTimestamp).format('LT')} ${moment(interaction.member.user.createdTimestamp).format('LL')} (${moment(interaction.member.user.createdTimestamp).fromNow()})` },
          { name: 'Badges:', value: `${badges}` },
          { name: 'Status:', value: `${interaction.member.user.presence?.status}`},
          { name: 'Joined At:', value: `${moment(interaction.member.joinedTimestamp).format('LT')} ${moment(interaction.member.joinedTimestamp).format('LL')} (${moment(interaction.member.joinedTimestamp).fromNow()})` },
          { name: 'Roles', value: `${roles}` },
          { name: 'Permissions', value: `${perms}` }
        )
        .setThumbnail(interaction.member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
    } else {
      const roles = '```' + member.roles.cache.map((role) => role.name).join(`, `) + '```';
      const perms = '```' + member.permissions.toArray().join(`, `) + '```';
      let badges = '```' + member.user.flags.toArray().join(', ') + '```';
      if (badges === '``````') badges = '```None```';
      userInfoEmbed = new MessageEmbed()
        .setColor(color)
        .setTitle(`${member.user.username}'s User Information`)
        .addFields(
          { name: 'Username: ', value: `${member.user.tag}` },
          { name: 'User ID: ', value: `${member.user.id}` },
          { name: 'Account Since:', value: `${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} (${moment(member.user.createdTimestamp).fromNow()})` },
          { name: 'Badges', value: `${badges}` },
           { name: 'Status:', value: `${member.presence?.status}`},
          { name: 'Joined At:', value: `${moment(member.joinedTimestamp).format('LT')} ${moment(member.joinedTimestamp).format('LL')} (${moment(member.joinedTimestamp).fromNow()})` },
          { name: 'Roles:', value: `${roles}` },
          { name: 'Permissions', value: `${perms}` }
        )
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
    }
    interaction.reply({ embeds: [userInfoEmbed] });
  }
}