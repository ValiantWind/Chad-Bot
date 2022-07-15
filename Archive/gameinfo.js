 const { MessageEmbed, TextChannel } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment');
const { getRoleColor } = require('../../../utils/getRoleColor');
const noblox = require('noblox.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gameinfo")
    .setDescription("Displays information about a specific Roblox game.")
    .addStringOption((option) => option
      .setName("gameid")
      .setDescription("The id of the game you want to view info of.")
      .setRequired(true)
    ),
  cooldown: 3000,
  category: 'Roblox',
  usage: '/gameinfo <gameid>',
  async execute(interaction) {

       if(!interaction.isCommand()) return;
    
   const 
    
    //await interaction.deferReply();

    try {
      
    } catch(error) {
      console.log(error)
      interaction.reply({content: 'An Error occured. Make sure the game id you typed is valid and exists!'})
    }
  }
};