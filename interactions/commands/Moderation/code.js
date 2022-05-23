const { SlashCommandBuilder } = require('@discordjs/builders');
const modstatsdb = require('quick.db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('execute')
    .setDescription(`Ignore this command.`)
    .addUserOption((option) => option
        .setName('target')
        .setDescription('ignore me')
        ),
  cooldown: 5000,
  category: 'Moderation',
  async execute(interaction) {
    const target = interaction.options.getMember('target');
  
return interaction.reply("You aren't worthy enough for this command")
  }
}