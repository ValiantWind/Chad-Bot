const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('exile')
    .setDescription(`Allows a Staff Member with sufficient permissions to exile (ban) a member from the server.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to exile (ban).`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're banning this user.`)
    ),
  cooldown: 5000,
  botRequiredPerms: ['BAN_MEMBERS'],
  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');
    if (member.id == interaction.member.user.id) {
      return interaction.reply({ content: `I mean you could just leave the server.`, ephemeral: true });
    }

    if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
      interaction.reply({ content: `Your roles must be higher than the roles of the person you want to ban!`, ephemeral: true });
    }

    if (!member.bannable) {
      interaction.reply({ content: `Make sure that my role is higher than the role of the person you want to ban!`, ephemeral: true });
    }
    
    const author = interaction.member.user.username;
    

    let color = getRoleColor(interaction.guild);
    const kickEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(`Ban Information`)
      .addFields(
        { name: `Defendant's name:`, value: `${member.user.tag}` },
        { name: `Issued by:`, value: `${author}` }
      )
      .setTimestamp();
    let msg = `${author} banned you from ${interaction.guild.name}.`;
    if (reason) {
      kickEmbed.addField('Reason', reason);
      msg += ` Reason: ${reason}`;
    }
    
    if (!member.user.bot) await member.send({ content: msg });
    
    member.ban();
  }
}