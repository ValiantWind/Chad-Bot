const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
          .setName('verify')
          .setDescription('Verifies a user and gives them access to the server.'),
      cooldown: 5000,
    async execute(interaction){
    return interaction.reply('Putin Deez nutz in yo mouth (WIP Command)')
  }
}