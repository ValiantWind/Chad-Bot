const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const db = require('quick.db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription(`Allows a Staff Member with sufficient permissions to warn a member in the server.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to warn.`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're warning this user for.`)
    ),
  cooldown: 5000,
  category: 'Moderation',
  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No reason specified.'
    if (member.id == interaction.member.user.id) {
      return interaction.reply({ content: `Do you to get demoted my guy?` });
    }
  
    if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
      interaction.reply({ content: `Your roles must be higher than the roles of the person you want to warn!`, ephemeral: true });
    }

  
    
    const author = interaction.member.user.username;
    

    let color = getRoleColor(interaction.guild);
    const warnEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(`***Warned!**`)
      .setDescription(`***Successfully Warned **${user}! || ${reason} `)
      .setFooter('Imagine being warned lol')
      .setTimestamp();
    let msg = `${author} warned you in ${interaction.guild.name} for ${reason}.`;
    
    if (!member.user.bot) await member.send({ content: msg });
    
     db.add(`warns_${member.id}`, 1)
    interaction.reply({embeds: warnEmbed});
  }
}