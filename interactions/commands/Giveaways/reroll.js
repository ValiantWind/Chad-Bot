const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionType } = require('discord.js');

module.exports = {
  data:  new SlashCommandBuilder()
    .setName('greroll')
    .setDescription('Reroll a giveaway that just ended.')
      .addStringOption((option) => option
          .setName('giveaway')
          .setDescription('The giveaway to reroll (provide the message ID of the giveaway)')
          .setRequired(true)
              ),
    cooldown: 5000,
    category: "Giveaways",
    usage: '/greroll <giveaway message id>',
    async execute(interaction, client) {

      if(interaction.type != InteractionType.ApplicationCommand) return;
      if (!interaction.isChatInputCommand()) return;

        // If the member doesn't have enough permissions
        // if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "GiveawayManager")) {
        //     return interaction.reply({
        //         content: 'You need to have the "GiveawayManager" role to reroll this giveaway.',
        //         ephemeral: true
        //     });
        // }

        // const query = interaction.options.getString('giveaway');

        // // try to find the giveaway with the provided prize OR with the ID
        // const giveaway =
        //     // Search with giveaway prize
        //     client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
        //     // Search with giveaway ID
        //     client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        // // If no giveaway was found
        // if (!giveaway) {
        //     return interaction.reply({
        //         content: 'Unable to find a giveaway for `' + query + '`.',
        //         ephemeral: true
        //     });
        // }

        // if (!giveaway.ended) {
        //     return interaction.reply({
        //         content: `[This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) has ended yet.`,
        //         ephemeral: true
        //     });
        // }

        // // Reroll the giveaway
        // client.giveawaysManager.reroll(giveaway.messageId)
        //     .then(() => {
        //         // Success message
        //         interaction.reply(`Successfully rerolled **[this giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})!**`);
        //     })
        //     .catch((e) => {
        //         interaction.reply({
        //             content: e,
        //             ephemeral: true
        //         });
        //     });
return interaction.reply("The Giveaway Module has temporarily been disabled due to a recent update Discord.js made to their library that broke the package I used to for the Giveaway commands. To be kept up to date on when the commands will come back, join the support server: https://discord.gg/zPzwgzczHz")
    }
};