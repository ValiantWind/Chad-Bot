 const { MessageEmbed, TextChannel } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment');
const { getRoleColor } = require('../../../utils/getRoleColor');
const noblox = require('noblox.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("robloxinfo")
    .setDescription("Displays information about a specific Roblox User.")
    .addStringOption((option) => option
      .setName("username")
      .setDescription("The user you want to view info about.")
      .setRequired(true)
    ),
  cooldown: 3000,
  async execute(interaction) {
    const color = getRoleColor(interaction.guild)
    const username = interaction.options.getString("username");
    await interaction.deferReply();

    try {
      const id = await noblox.getIdFromUsername(username)
      const info = await noblox.getPlayerInfo(id)
      const groupId = process.env.groupId

      const userGroupRank = await noblox.getRankNameInGroup(groupId, id)

      const avatarurl = await noblox.getPlayerThumbnail([id], '720x720', 'png', false, 'body')

  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(`${username}'s Profile`)
    .setDescription(info.blurb || 'No Description')
    .addField('Display Name', info.displayName || 'No Display Name')
    .addField('User ID', id.toString())
    .addField("Rank In the Server's Group", userGroupRank.toString() || 'Not in the Group')
    .addField('Join Date', info.joinDate.toDateString())
    .addField('Account Age (in days)', info.age.toString() || "Not Available")
    .addField('Friend Count', info.friendCount.toString())
    .addField('Follower Count', info.followerCount.toString())
    .addField('Following Count', info.followingCount.toString())
    .addField('Previous Username(s)', info.oldNames.toString() || 'No Previous Username(s)')
    .addField('Ban Status', info.isBanned.toString())
    .setTimestamp()
    .setThumbnail(avatarurl[0].imageUrl)

    interaction.editReply({embeds: [embed]})
    } catch(error) {
      console.log(error)
      interaction.editReply({content: 'An Error occured. Make sure the username you typed in exists or that the user is not banned!'})
    }
  }
};