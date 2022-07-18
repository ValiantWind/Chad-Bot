const { EmbedBuilder, InteractionType } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');



module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription(`Allows a Staff Member with sufficient permissions to unban a member from the server.`)
    .addStringOption((option) => option
      .setName('userid')
      .setDescription(`The userid of the user you want to unban.`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're unbanning this user.`)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/unban <user> <reason (Optional)>',
  async execute(interaction) {

if(interaction.type != InteractionType.ApplicationCommand) return;

    const options = interaction.options;

      const target = options.get('userid')?.value;

      const totalbans = await interaction.guild.bans.fetch()

      await interaction.guild.bans.remove(target);
      const embed = new EmbedBuilder()
      .setColor('BLURPLE')
      .setDescription(` Successfully unbanned <@${target}>.`)
      await interaction.reply({embeds: [embed]})
  }
}

