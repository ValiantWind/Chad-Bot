const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sliencio')
    .setDescription(`Restricts a user from sending messages.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to slience (mute).`)
      .setRequired(true)
    )
    .addNumberOption((option) => option
      .setName('minutes')
      .setDescription(`The amount of minutes that you want the user to stay quiet (muted).`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're silencing (muting) this user for.`)
    ),
  cooldown: 3000,
  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const user = interaction.options.getUser('user');
    const mins = interaction.options.getNumber('minutes');
    const reason = interaction.options.getString('reason');
    const author = interaction.member.user.username;
    let mutedRole = interaction.guild.roles.cache.find((r) => r.name === 'Muted');
    if (mins > 720 || mins <= 0) {
      return interaction.reply({ content: `Minutes must be a positive number lower than 720.`, ephemeral: true });
    }

    if (member.id == interaction.member.user.id) {
      return interaction.reply({ content: `Stupid mod. You can't silence youself, dumbass why would you even want to do that lol`, ephemeral: true });
    }

    if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
      return interaction.reply({ content: `Your roles must be higher than the roles of the person you want to silence!`, ephemeral: true });
    }


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
      return interaction.reply({ content: `${user.username} is already silenced!`, ephemeral: true });
    }

    member.roles.add(mutedRole);
    let color = getRoleColor(interaction.guild);
    const muteEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(`Slience Info`)
      .addFields(
        { name: `Defendant's name:`, value: `${member.user.tag}` },
        { name: `Issued by:`, value: `${author}` },
        { name: `Duration:`, value: `${mins} minutes` },
      )
      .setFooter(`You can use /unmute to unmute the user earlier than ${mins} minutes and /muteinfo to view information about his mute.`)
      .setTimestamp();
    const millisecondsPerMinute = 60 * 1000;
    let MuteInfo = {};
    MuteInfo.userID = member.id;
    MuteInfo.unmuteDate = Date.now() + mins * millisecondsPerMinute;
    MuteInfo.author = author;
    let msg = `${author} has muted you from ${interaction.guild.name}. Duration: ${mins} minutes.`;
    if (reason) {
      muteEmbed.addField('Reason', reason);
      msg += ` Reason: ${reason}.`;
      MuteInfo.reason = reason;
    }

    if (!member.user.bot) member.send({ content: msg });

  await interaction.reply({content: `Successfully Muted ${member}. Imagine being muted smh`})
  }
}