 const { MessageEmbed, TextChannel } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment');
const { getRoleColor } = require('../../../utils/getRoleColor');
const request = require('request-promise');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("devforuminfo")
    .setDescription("Displays information about a specific Roblox DevForum User.")
    .addStringOption((option) => option
      .setName("username")
      .setDescription("The devforum user you want to view info about.")
      .setRequired(true)
    ),
  cooldown: 3000,
  category: 'Roblox',
  async execute(interaction) {
    const color = getRoleColor(interaction.guild)
    const devuser = interaction.options.getString("username");
    await interaction.deferReply();

    try {
     const devForumData = await request({
        uri: `https://devforum.roblox.com/u/${devuser}.json`,
        json: true,
        simple: false,
      })

      let devProfile = devForumData.user
      //console.log(devForumData)
      let bio = "Bio failed to load"

        bio =
            bio == "Bio failed to load" && devForumData.bio_raw
              ? devForumData.bio_raw
              : bio
          // Remove excess new lines in the bio
          while ((bio.match(/\n\n/gm) || []).length > 3) {
            const lastN = bio.lastIndexOf("\n\n")
            bio = bio.slice(0, lastN) + bio.slice(lastN + 2)
          }

          // Truncate bio if it's too long
          if (bio.length > 500) {
            bio = bio.substr(0, 500) + "..."
          }
  let trustLevels = {
          4: "Roblox Staff",
          3: "Community Editor",
          2: "Regular",
          1: "Member",
          0: "Visitor",
        }

  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(`${devuser}'s Profile`)
    .setDescription(`Yes`)
    .addField('Title', devProfile.title)
    .addField(`Moderator?`, devProfile.moderator || 'No', true)
    .addField(`Admin?`, devProfile.admin || 'No', true)
    .addField(`Trust Level:`, trustLevels[devProfile.trust_level] || 'Unable to get trust level')
    .addField('Location:', devProfile.location || 'Not provided')
    .addField('Featured Website:', devProfile.website || 'Not Provided')
    .addField(`Profile Views`, devProfile.profile_view_count.toString() || 'Unable to get View Count', true)
    .addField('Answer Count', devProfile.accepted_answers.toString() || 'Unable to get answer count', true)
//.addField('Total Post Count', devProfile.post_count.toString())
    interaction.editReply({embeds: [embed]})
    } catch(error) {
      console.log(error)
      interaction.editReply({content: 'An Error occured. Make sure the username you typed in is a member of the DevForum or that the user is not banned from the DevForum!'})
    }
  }
};