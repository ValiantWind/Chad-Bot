const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('gend')
      .setDescription('End a currently running giveaway')
      .addStringOption((option) => option
        .setName('giveaway')
        .setDescription('The giveaway you want to end')
        .setRequired(true)
      ),
    cooldown: 5000,
    category: "Giveaways",
    usage: '/gend <giveaway message ID>',
    async execute(interaction, client) {
      
      if(interaction.type != InteractionType.ApplicationCommand) return;
if (!interaction.isChatInputCommand()) return;
        // If the member doesn't have enough permissions
        // if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "GiveawayManager")) {
        //     return interaction.reply({
        //         content: 'You need to have the "GiveawayManager" role to end giveaways.',
        //         ephemeral: true
        //     });
        // }

        // const query = interaction.options.getString('giveaway');

        // // fetching the giveaway with message Id or prize
        // const giveaway =
        //     // Search with giveaway prize
        //     client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
        //     // Search with giveaway Id
        //     client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        // // If no giveaway was found with the corresponding input
        // if (!giveaway) {
        //     return interaction.reply({
        //         content: 'Unable to find a giveaway for `' + query + '`.',
        //         ephemeral: true
        //     });
        // }

        // if (giveaway.ended) {
        //     return interaction.reply({
        //         content: 'Stupid. This giveaway has already ended.',
        //         ephemeral: true
        //     });
        // }

        // // Edit the giveaway
        // client.giveawaysManager.end(giveaway.messageId)
        //     // Success message
        //     .then(() => {
        //         // Success message
        //         interaction.reply(`**[This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** has now ended!`);
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