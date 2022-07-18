const { InteractionType } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

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
    if(interaction.type != InteractionType.ApplicationCommand) return;
    const user = interaction.options.getMember('user');
    const roleToRemove = interaction.options.getRole('role');

    if (interaction.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
      return interaction.reply({ content: `You can't modify the roles of someone who has a higher rank than yours.`, ephemeral: true });
    }

      user.roles.remove(roleToRemove);
  await interaction.reply('Role Removed!')
  }
}
  