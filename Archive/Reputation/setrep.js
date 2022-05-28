const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const repdb = require('quick.db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setprep')
    .setDescription(`Gives one reputation to a user.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`User to give the reputation to`)
      .setRequired(true)
    )
    .addIntegerOption((option) => option
     .setName('reputation')
      .setDescription("The Amount of reputation you want to set the user's reputation to")
      .setRequired(true)
    ),
  cooldown: 60000,
  category: 'Reputation',
  usage: '/setrep <member> <reputation>',
  async execute(interaction) {
    const user = interaction.options.getMember('user');
    const reputation = interaction.options.getInteger('reputation');
    if(interaction.user.id == '318423524807016448'){
      repdb.set(`totalReputation_${user.id}`, reputation)
    } else {
      return interaction.reply("Sorry, but I, the bot dev, don't plan on ever adding this command because I want the reputation to be equal and fairly earned in every single server. Maybe it will be added when or if the bot gets popular, but for now, this command stays locked.")
    }
  }
}