const { InteractionType, PermissionFlagsBits, ChannelType } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require('ms');

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
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  cooldown: 5000,
  category: 'Moderation',
  usage: "/slowmode <channel> <number of seconds>",
  async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return;
    
    const amount = interaction.options.getString('time') || 0;
    const channelToSlowDown = interaction.options.getChannel('channel');

    const milliseconds = ms(amount)

  
    if(isNaN(milliseconds)){
      interaction.reply('Please enter a valid time!')
      
    } else if (channelToSlowDown.type != ChannelType.GuildText) {

      interaction.reply('Please enter a Text channel!')
   
    } else if (milliseconds < 1000) {
      interaction.reply('The minimum slowmode time is 1 second')
    } else if (milliseconds > 21600) {
      interaction.reply('The maximum slowmode time is 6 hours')
    } else {
          channelToSlowDown.setRateLimitPerUser(milliseconds / 1000);

    interaction.reply(`Successfully set the slowmode in ${channelToSlowDown} to ${ms(milliseconds, {long: true})}`);
    }
  }
}