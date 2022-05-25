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
  async execute(interaction) {
    const amount = interaction.options.getString('time') || 0;
    const channelToSlowDown = interaction.options.getChannel('channel');
    const milliseconds = ms(amount)


    if(isNaN(milliseconds)){
      interaction.reply('Please enter a valid time')
    } else if (milliseconds < 1000) {
      interaction.reply('The minimum slowmode is 1 second (1000 milliseconds).')
      
    } else if (channelToSlowDown.isText()) {
   
    channelToSlowDown.setRateLimitPerUser(milliseconds / 1000);

    interaction.reply(`Successfully set the slowmode in ${channelToSlowDown} to ${milliseconds} milliseconds.`);
    } else {
      interaction.reply('Please enter a Text channel!')
    }
  }
}