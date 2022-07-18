const { EmbedBuilder, InteractionType } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription(`Bulk deletes a certain amount of messages.`)
    .addIntegerOption((option) => option
      .setName('amount')
      .setDescription(`The number of messages you want to purge.`)
      .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/purge <messages> (must be less than 100 and greater than 1)',
  async execute(interaction) {
    if(interaction.type != InteractionType.ApplicationCommand) return;
    const amount = interaction.options.getInteger('amount');

    
    if (amount < 2 || amount > 100) {
      return interaction.reply({ content: `You must enter a number higher than 1 and less than 100.`, ephemeral: true });
    }

   await interaction.channel.bulkDelete(amount, true);


    const clearEmbed = new EmbedBuilder()
    .setTitle('Success!')
    .setDescription(`Successfully purged ${amount} messages.`)
    .setColor('BLURPLE')

    await interaction.reply({embeds: [clearEmbed], ephemeral: true});
  }
}