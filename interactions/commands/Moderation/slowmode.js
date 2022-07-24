const { InteractionType } = require('discord.js');
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
    if (!interaction.isChatInputCommand()) return;
    
    
    const amount = interaction.options.getString('time') || 0;
    const channelToSlowDown = interaction.options.getChannel('channel');

  
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