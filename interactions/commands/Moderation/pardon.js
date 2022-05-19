const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pardon')
    .setDescription(`Allows a Staff Member with sufficient permissions to pardon (unban) a member from the server.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to pardon (unban).`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're unbanning this user.`)
    ),
  cooldown: 5000,
  category: 'Moderation',
  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');
    if (member.id == interaction.member.user.id) {
      return interaction.reply({ content: `No`, ephemeral: true });
    }
    
    const author = interaction.member.user.username;
    

    let color = getRoleColor(interaction.guild);
    const kickEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(`Pardon Information`)
      .addFields(
        { name: `Defendant's name:`, value: `${member.user.tag}` },
        { name: `Issued by:`, value: `${author}` }
      )
      .setTimestamp();
    let msg = `${author} pardoned (unbanned) you from ${interaction.guild.name}.`;
    if (reason) {
      kickEmbed.addField('Reason', reason);
      msg += ` Reason: ${reason}`;
    }
    
    if (!member.user.bot) await member.send({ content: msg });
    
    member.unban();
  }
}