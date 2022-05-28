 const { MessageEmbed, TextChannel } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment');
const { getRoleColor } = require('../../../utils/getRoleColor');
const noblox = require('noblox.js');
const request = require('request-promise');

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
  category: 'Roblox',
  usage: '/robloxinfo <roblox username>',
  async execute(interaction) {
    const color = getRoleColor(interaction.guild)
    const username = interaction.options.getString("username");

    if(!interaction.isCommand()) return;
    
    await interaction.deferReply();

    try {
      const devForumData = await request({
        uri: `https://devforum.roblox.com/u/${username}.json`,
        json: true,
        simple: false,
      })
      let devProfile = devForumData.user

      let trustLevels = {
          4: "Roblox Staff",
          3: "Community Editor",
          2: "Regular",
          1: "Member",
          0: "Visitor",
        }
      
      const id = await noblox.getIdFromUsername(username)
      const info = await noblox.getPlayerInfo(id)
      const groupId = process.env.groupId

      let trustLevel;
      if(!devForumData){
        let trustLevel = 'No DevForum Account';
      } else {
        let trustLevel = trustLevels[devProfile.trust_level] || trustLevels[devForumData.trust_level];
      }


      const avatarurl = await noblox.getPlayerThumbnail([id], '720x720', 'png', false, 'body')

  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(`${username}'s Profile`)
    .setDescription(info.blurb || 'No Description')
    .addField('Display Name', info.displayName || 'No Display Name')
    .addField('User ID', id.toString(), true)
    .addField('Join Date', info.joinDate.toDateString(), true)
    .addField('Account Age (in days)', info.age.toString() || "Not Available", true)
    .addField('Friend Count', info.friendCount.toString(), true)
    .addField('Follower Count', info.followerCount.toString(), true)
    .addField('Following Count', info.followingCount.toString(), true)
    .addField('Previous Username(s)', info.oldNames.toString() || 'No Previous Username(s)')
    .addField('Ban Status', info.isBanned.toString())
    .addField('DevForum Trust Level', trustLevel)
    .setTimestamp()
    .setThumbnail(avatarurl[0].imageUrl)

    interaction.editReply({embeds: [embed]})
    } catch(error) {
      console.log(error)
      interaction.editReply({content: 'An Error occured. Make sure the username you typed in exists or that the user is not banned!'})
    }
  }
};