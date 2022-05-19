 const { MessageEmbed, TextChannel } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const noblox = require('noblox.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("groupinfo")
    .setDescription("Displays information about a specific Roblox Group.")
    .addIntegerOption((option) => option
      .setName("groupid")
      .setDescription("ID of the group you want to view the info of.")
      .setRequired(true)
    ),
  cooldown: 3000,
  category: 'Roblox',
  async execute(interaction) {
    const color = getRoleColor(interaction.guild)
    const groupId = interaction.options.getInteger("groupid");
    await interaction.deferReply();
    const productInfo = await noblox.getProductInfo(1117747196)

    try {
      const info = await noblox.getGroup(groupId)
       const groupLogo = await noblox.getLogo(groupId, '720x720', false, 'png')

      let groupShout = info.shout
      let groupShoutMessage;
      if(groupShout === null){
        groupShoutMessage = 'No Group Shout';
      } else {
        groupShoutMessage = groupShout.body
      }
        
  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(`${info.name}'s Group Info`)
    .addField('Group Owner', info.owner.username || 'No Owner')
    .addField('Group ID', info.id.toString())
    .addField('Group Description', info.description || 'No Description')
    .addField(`Current Group Shout Message`, `${groupShoutMessage}`)
    .addField('Group Open to Everyone?', info.publicEntryAllowed.toString())
    .addField('Member Count', info.memberCount.toString())
    .setTimestamp()
    .setThumbnail(groupLogo)

    interaction.editReply({embeds: [embed]})
    } catch(error) {
      console.log(error)
      interaction.editReply({content: 'An Error occured. Make sure the group id you typed in exists or that the group is not banned!'})
    }
  console.log(productInfo)
  }
};