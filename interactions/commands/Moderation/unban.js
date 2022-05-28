const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription(`Allows a Staff Member with sufficient permissions to unban a member from the server.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user you want to unban.`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're unbanning this user.`)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/unban <member> <reason (Optional)>',
  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');

    if(!interaction.isCommand()) return;

    const id = member.id;
    
    const author = interaction.member.user.username;
    

    let color = getRoleColor(interaction.guild);
    const unbanEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(`***Unbanned!***`)
      .setDescription(`***Successfully unbanned ***${member}! || ${reason} `)
      .setTimestamp();
    let msg = `${author}  unbanned you from ${interaction.guild.name}.`;
    
    if (!member.user.bot) await member.send({ content: msg });
    
    guild.members.unban(id);
    db.subtract(`banModstats_${interaction.member.user.id}`, 1)
    db.subtract(`totalModstats_${interaction.member.user.id}`, 1)
    interaction.reply({embeds: unbanEmbed})
  }
}