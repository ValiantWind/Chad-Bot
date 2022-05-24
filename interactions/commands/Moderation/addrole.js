const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
          .setName('addrole')
          .setDescription('Adds a role to a user')
    .addUserOption((option) => option
            .setName('user')
            .setDescription('User you want to add the role to')
            .setRequired(true)
      )
    .addRoleOption((option) => option
      .setName('role')
      .setDescription('Role you want to add to the user')
      .setRequired(true)
        ),
      cooldown: 5000,
    async execute(interaction){
      const target = interaction.options.getMember('user');
      const roleToAdd = interaction.options.getRole('role');
     if (member.roles.cache.some(role => role.name === roleToAdd)) {
       interaction.reply('That user already has that role!');   
}

      target.roles.add(roleToAdd)
      interaction.reply(`Successfully added ${roleToAdd} to ${target}`);
    }
}