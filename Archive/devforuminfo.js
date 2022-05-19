 const { MessageEmbed, TextChannel } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment');
const { getRoleColor } = require('../../../utils/getRoleColor');
const fetch = require('node-fetch');

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
      const res = await fetch(`https://devforum.roblox.com/u/${devuser}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
});
      const data = await res.json;

      console.log(data)



  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(`${devuser}'s Profile`)
    .setDescription(`${data.user.username}`)

    interaction.editReply({embeds: [embed]})
    } catch(error) {
      console.log(error)
      interaction.editReply({content: 'An Error occured. Make sure the username you typed in exists or that the user is not banned!'})
    }
  }
};