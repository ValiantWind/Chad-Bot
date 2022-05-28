const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const repdb = require('quick.db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rep')
    .setDescription(`View the reputation of a user.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`User to view the reputation of`)
      .setRequired(true)
    ),
  cooldown: 60000,
  category: 'Reputation',
  usage: '/rep <member>',
  async execute(interaction) {
  const user = interaction.options.getMember('user');
    let totalReputation = repdb.fetch(`totalReputation_${user.id}`)
    let gaveReputation = repdb.fetch(`gaveReputation_${user.id}`)
    let receivedReputation = repdb.fetch(`receivedReputation_${user.id}`)
    if(totalReputation == null ){ 
      totalReputation = 0
    } 
    if(gaveReputation == null){
      gaveReputation == 0
    }
    if(receivedReputation == null){
      receivedReputation == 0
    }
      let embed = new MessageEmbed()
        .setTitle(`Reputation of ${user.tag || user.user.tag}`)
        .setDescription(`Total Reputation: ${reputation}`)
        .addField('Total Reputation Given to others', gaveReputation, true)
        .addField('Total Reputation Received', receivedReputation, true)
        .setTimestamp()
        .setColor('BLURPLE')
    interaction.reply({ embeds: [embed] })
    }
  }