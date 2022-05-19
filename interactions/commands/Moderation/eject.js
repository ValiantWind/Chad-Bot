const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eject')
    .setDescription(`Allows a Staff Member with sufficient permissions to eject (kick) a member out of the server.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to eject (kick).`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're ejecting (kicking) this user for.`)
    ),
  cooldown: 5000,
  category: 'Moderation',
  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');
    if (member.id == interaction.member.user.id) {
      return interaction.reply({ content: `I mean you could just leave the server.` });
    }

    if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
      interaction.reply({ content: `Your roles must be higher than the roles of the person you want to eject!`, ephemeral: true });
    }

    if (!member.kickable) {
      interaction.reply({ content: `Make sure that my role is higher than the role of the person you want to eject!`, ephemeral: true });
    }
    
    const author = interaction.member.user.username;
    

    let color = getRoleColor(interaction.guild);
    const kickEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(`Ejection Information`)
      .addFields(
        { name: `Defendant's name:`, value: `${member.user.tag}` },
        { name: `Issued by:`, value: `${author}` }
      )
      .setTimestamp();
    let msg = `${author} ejected (kicked) you from ${interaction.guild.name}.`;
    if (reason) {
      kickEmbed.addField('Reason', reason);
      msg += ` Reason: ${reason}`;
    }
    
    if (!member.user.bot) await member.send({ content: msg });
    
    member.kick();
  }
}