const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const repdb = require('quick.db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('takerep')
    .setDescription(`Takes away one reputation from a user.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`User to take the reputation from.`)
      .setRequired(true)
    )
    .addIntegerOption((option) => option
      .setName('reputation')
      .setDescription('The number of reputation you want to remove')
      .setRequired('true')
    ),
  cooldown: 60000,
  category: 'Reputation',
  usage: '/takerep <member>',
  async execute(interaction) {
  const user = interaction.options.getMember('user');

    if(){
      interaction.reply("You can't give reputation to yourself!")
    } else {
      repdb.add(`totalReputation_${user.id}`, 1)
      repdb.add(`receivedReputation_${user.id}`, 1)
      repdb.add(`gaveReputation_${interaction.member.user.id}`, 1)
      interaction.reply(`Successfully gave ${user} 1 reputation.`)
    }
  }
}