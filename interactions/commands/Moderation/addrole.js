const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addrole')
    .setDescription(`Adds a role to a user`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription('The user you want to add the role to')
      .setRequired(true)
    )
    .addRoleOption((option) => option
      .setName('role')
      .setDescription(`The role you want to add to the user`)
      .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/addrole <member> <role>',
  async execute(interaction) {
    const user = interaction.options.getMember('user');
    const roleToAdd = interaction.options.getRole('role');

    if(!interaction.isCommand()) return;
   
      user.roles.add(roleToAdd);
    await interaction.reply('Role Added!')
  }
}
  