const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const modstatsdb = require('quick.db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription(`Unrestricts a user from sending messages.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to unmute.`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're muting this user for.`)
      .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/unmute <member> <reason>',
  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No reason provided.'
    const author = interaction.member.user.username;
    let mutedRole = interaction.guild.roles.cache.get((r) => r.name === 'Muted');
      

    if (!member.roles.cache.has(mutedRole)) {
      await interaction.reply({ content: `${member.user.username} is already unmuted!`, ephemeral: true });
    }


     let color = getRoleColor(interaction.guild);
    const muteEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(`**Unmuted!**`)
      .setDescription(`***Successfully unmuted ***${member} || ${reason} `)
      .setTimestamp();
    
    let msg = `${author} has unmuted you from ${interaction.guild.name} for ${reason}.`;

    if (!member.user.bot) member.send({ content: msg });

   member.roles.remove(mutedRole.id); modstatsdb.subtract(`muteModstats_${interaction.member.user.id}`, 1)
    modstatsdb.subtract(`totalModstats_${interaction.member.user.id}`, 1)
  await interaction.reply({embeds: [muteEmbed]})
  }
}