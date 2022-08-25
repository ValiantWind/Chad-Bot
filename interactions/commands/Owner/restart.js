require('dotenv').config;
const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('@discordjs/builders');
const { EmbedBuilder, InteractionType } = require('discord.js');
const fetch = require('node-fetch');
const noblox = require('noblox.js');

const ownerId = process.env.valiantId

module.exports = {
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription("This is an Owner-Only command. Don't bother trying to use, as it will not work."),
  cooldown: 5000,
  category: 'Information',
  usage: '/eval <user>',
	async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return;

    if(interaction.user.id === ownerId) {

    
      process.exit();

		
    } else {
       interaction.reply('Nice try lol. Only the developer can use this command.')
    }
    
	},
};