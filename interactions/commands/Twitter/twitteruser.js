const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment');
const { getRoleColor } = require('../../../utils/getRoleColor');

const { twitterClient } = require('../../../index')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('twitterinfo')
    .setDescription(`Displays information about a Twitter User.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription('The user you want to view info about.')
    ),
  cooldown: 3000,
  category: 'Information',
  usage: '/twitterinfo <member>',
  async execute(interaction) {

      if(!interaction.isCommand()) return;

    interaction.reply("This command is a work in progress. When its finished, you'll be able to see the info of any twitter user that you choose.")

    
    
  }
}