const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removerole')
    .setDescription(`Removes a role from a user`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription('The user you want to remove the role from')
      .setRequired(true)
    )
    .addRoleOption((option) => option
      .setName('role')
      .setDescription(`The role you want to remove from the user`)
      .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/removerole <member> <role>',
  async execute(interaction) {
    const user = interaction.options.getMember('user');
    const roleToRemove = interaction.options.getRole('role');

    if(!interaction.isCommand()) return;

      user.roles.remove(roleToRemove);
  await interaction.reply('Role Removed!')
  }
}
  