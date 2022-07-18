require('dotenv').config;
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, InteractionType } = require('discord.js');
const fetch = require('node-fetch');
const noblox = require('noblox.js');

const ownerId = process.env.valiantId

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription('Ignore this command')
  .addUserOption((option) => option
    .setName('user')
    .setDescription('stop using this command its useless')
    .setRequired(true)
  ),
  cooldown: 5000,
  userPermissions: "ADMINISTRATOR",
  category: 'Information',
  usage: '/eval <user>',
	async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return;

    if(interaction.user.id === ownerId) {

     interaction.reply('Pog')
    } else {
       interaction.reply('Only the developer can use this command.')
    }
    
	},
};