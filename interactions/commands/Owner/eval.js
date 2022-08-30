require('dotenv').config;
const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('@discordjs/builders');
const { EmbedBuilder, InteractionType } = require('discord.js');
const fetch = require('node-fetch');
const modstatsdb = require('quick.db');

const ownerId = process.env.valiantId

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription("This is an Owner-Only command. Don't bother trying to use, as it will not work."),
  cooldown: 5000,
  category: 'Information',
  usage: '/eval',
	async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return;

    

    let totalModstats = modstatsdb.fetch(`totalModstats_${member.id}`)
    let kickModstats = modstatsdb.fetch(`kickModstats_${member.id}`)
    let banModstats = modstatsdb.fetch(`banModstats_${member.id}`)
    let warnModstats = modstatsdb.fetch(`warnModstats_${member.id}`)
    let muteModstats = modstatsdb.fetch(`muteModstats_${member.id}`)

    if(interaction.user.id === ownerId) {

    modstatsdb.add(`warnModstats_${member.id}`)
     

		
    } else {
       interaction.reply('Nice try lol. Only the developer can use this command.')
    }
    
	},
};