const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');

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
    ),
  cooldown: 3000,
  category: 'Moderation',
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
      return interaction.reply({ content: `Stupid mod. You can't mute youself. Why would you even want to do that lol`, ephemeral: true });
    }

    if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
      return interaction.reply({ content: `Your roles must be higher than the roles of the person you want to mute!`, ephemeral: true });
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
      return interaction.reply({ content: `${user.username} is already muted!`, ephemeral: true });
    }

    member.roles.add(mutedRole);
     let color = getRoleColor(interaction.guild);
    const muteEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(`***Banned!**`)
      .setDescription(`***Successfully muted **${user}! || ${reason} `)
      .setFooter('Imagine being muted lol')
      .setTimestamp();
    let msg = `${author} muted you from ${interaction.guild.name}.`;
    
    if (!member.user.bot) await member.send({ content: msg });
    const millisecondsPerMinute = 60 * 1000;
    let MuteInfo = {};
    MuteInfo.userID = member.id;
    MuteInfo.unmuteDate = Date.now() + mins * millisecondsPerMinute;
    MuteInfo.author = author;
    let msg = `${author} has muted you from ${interaction.guild.name} for ${reason}. Duration: ${mins} minutes.`;

    if (!member.user.bot) member.send({ content: msg });

  await interaction.reply({embeds: embed})
  }
}