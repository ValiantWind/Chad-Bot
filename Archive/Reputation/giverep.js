const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const repdb = require('quick.db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giverep')
    .setDescription(`Gives one reputation to a user.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`User to give the reputation to`)
      .setRequired(true)
    ),
  cooldown: 60000,
  category: 'Reputation',
  usage: '/giverep <member>',
  async execute(interaction) {
  const user = interaction.options.getMember('user');

    if(user.id == interaction.member.user.id){
      interaction.reply("You can't give reputation to yourself!")
    } else {
      repdb.add(`totalReputation_${user.id}`, 1)
      repdb.add(`receivedReputation_${user.id}`, 1)
      repdb.add(`gaveReputation_${interaction.member.user.id}`, 1)
      interaction.reply(`Successfully gave ${user} 1 reputation.`)
    }
  }
}