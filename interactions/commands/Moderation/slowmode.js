const { MessageEmbed, Channel } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const ms = require('ms');
const client = require('../../../index')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription(`Sets a given slowmode time for a certain channel.`)
    .addChannelOption((option) => option
        .setName('channel')
        .setDescription('The channel you want the slowmode to be set in.')
        .setRequired(true)
      )
    .addStringOption((option) => option
      .setName('time')
      .setDescription(`The number of seconds you want the slowmode to be`)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: "/slowmode <channel> <number of seconds>",
  async execute(interaction) {
    const amount = interaction.options.getString('time') || 0;
    const channelToSlowDown = interaction.options.getChannel('channel');

    if(!interaction.isCommand()) return;

  
    if(isNaN(amount)){
      interaction.reply('Please enter a valid time!')
      
    } else if (channelToSlowDown.isText()) {
   
    channelToSlowDown.setRateLimitPerUser(amount);

    interaction.reply(`Successfully set the slowmode in ${channelToSlowDown} to ${amount} seconds.`);
    } else {
      interaction.reply('Please enter a Text channel!')
    }
  }
}