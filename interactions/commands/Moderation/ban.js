const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const modstatsdb = require('quick.db');
const bandb = require('../../../models/bandb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription(`Allows a Staff Member with sufficient permissions to ban a member from the server.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to ban.`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're banning this user.`)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/ban <member>',
  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');

    if(!interaction.isCommand()) return;
    
    if (member.id == interaction.member.user.id) {
      return interaction.reply({ content: `I mean you could just leave the server.`, ephemeral: true });
    }

    if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
      interaction.reply({ content: `Your roles must be higher than the roles of the person you want to ban!`, ephemeral: true });
    }

    if (!member.bannable) {
      interaction.reply({ content: `Make sure that my role is higher than the role of the person you want to ban!`, ephemeral: true });
    }

new bandb({
    userId: member.id,
    guildId: interaction.guildId,
    moderatorId: interaction.user.id,
    reason,
    timestamp: Date.now(),
    
  }).save();

    
    const author = interaction.member.user.username;
    

    let color = getRoleColor(interaction.guild);
    const banEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(`***Banned!**`)
      .setDescription(`***Successfully banned **${member}! || ${reason} `)
      .setFooter('Imagine being banned lol')
      .setTimestamp();
    let msg = `${author} banned you from ${interaction.guild.name}.`;
    
    if (!member.user.bot) await member.send({ content: msg });
    
    interaction.guild.members.ban(member);
    modstatsdb.add(`banModstats_${interaction.member.user.id}`, 1)
    modstatsdb.add(`totalModstats_${interaction.member.user.id}`, 1)
    interaction.reply({ embeds: [banEmbed]})
  }
}