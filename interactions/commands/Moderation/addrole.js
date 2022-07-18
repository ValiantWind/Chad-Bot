const { InteractionType } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

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

     if(interaction.type != InteractionType.ApplicationCommand) return;
    
    const user = interaction.options.getMember('user');
    const roleToAdd = interaction.options.getRole('role');

    //     if (interaction.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
    //   return interaction.reply({ content: `You can't modify the roles of someone who has a higher rank than yours. You can't give yourself roles that are higher than yours either.`, ephemeral: true });
    // }
   
      user.roles.add(roleToAdd);
    await interaction.reply('Role Added!')
  }
}
  