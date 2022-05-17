const { MessageEmbed } = require('discord.js');
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
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    if (amount < 2 || amount > 100) {
      return interaction.reply({ content: `You must enter a number higher than 1 and less than 100.`, ephemeral: true });
    }

    interaction.channel.bulkDelete(amount, true);
    let color = getRoleColor(interaction.guild);
    const clearEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(`Purged Messages`)
      .addFields(
        { name: 'Purged by:', value: `${interaction.member.user.username}` },
        { name: 'Amount of Messages Purged:', value: `${amount}` },
        { name: 'Channel:', value: `${interaction.channel.name}` }
      )
      .setTimestamp();

      await interaction.reply({content: `Successfully purged ${amount} messages!`, ephemeral: true});
  }
}