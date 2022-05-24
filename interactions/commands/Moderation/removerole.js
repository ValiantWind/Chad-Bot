const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
          .setName('removerole')
          .setDescription('Removes a role from a user')
    .addUserOption((option) => option
            .setName('user')
            .setDescription('User you want to remove the role from')
            .setRequired(true)
      )
    .addRoleOption((option) => option
      .setName('role')
      .setDescription('Role you want to remove from the user')
      .setRequired(true)
        ),
      cooldown: 5000,
    async execute(interaction){
      const target = interaction.options.getMember('user');
      const roleToRemove = interaction.options.getRole('role');
     if (!member.roles.cache.some(role => role.name === roleToRemove)) {
       interaction.reply('That user does not have that role!');   
}

      target.roles.remove(roleToRemove)
      interaction.reply(`Successfully removed ${roleToRemove} from ${target}`);
    }
}