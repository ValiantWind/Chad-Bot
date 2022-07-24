const { EmbedBuilder, InteractionType } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const messages = require("../../../utils/message");
const ms = require("ms");
const { getRoleColor } = require('../../../utils/getRoleColor');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('gstart')
  .setDescription('Starts a giveaway')
    .addStringOption((option) => option
      .setName('duration')
      .setDescription('How long the giveaway should last for. Examples: 1m, 1h, 1d')   
      .setRequired(true)
      )
    .addIntegerOption((option) => option
     .setName('winners')
     .setDescription('The number of winners you want the giveaway to have')
     .setRequired(true)
  )
    .addStringOption((option) => option
      .setName('prize')
      .setDescription('What the prize of the giveaway is')
      .setRequired(true)
    )
    .addChannelOption((option) => option
      .setName('channel')
      .setDescription('The channel you want to start the giveaway in.')
      .setRequired(true)
    )
    .addRoleOption((option) => option
      .setName('role')
      .setDescription('The role you want to add that users need to join the giveawau (Optional)')
    )
    .addRoleOption((option) => option 
      .setName('bonusrole')
      .setDescription('The role that will receive bonus entries (Optional)')
    )
    .addIntegerOption((option) => option 
      .setName('bonus-entries')
      .setDescription('The # of bonus entries the role you chose above will receive (Required if you chose a bonus role)')
    )
    .addStringOption((option) => option
      .setName('invitelink')
      .setDescription('The Invite Link of the server you want to add as a join requirement (Optional)')        
    ),
  cooldown: 10000,
  category: "Giveaways",
  usage: '/gstart <duration> <winners> <prize> <channel> <role (optional)> <bonusrole (optional)> <bonus-entries (required if you chose a bonus role> <invitelink (optional>',
  async execute(interaction, client) {

     if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;

    // If the member doesn't have enough permissions
  //   if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "GiveawayManager")) {
  //     return interaction.reply({
  //       content: `You need to have the "GiveawayManager" role to start giveaways.`,
  //       ephemeral: true
  //     });
  //   }

  //   const giveawayChannel = interaction.options.getChannel('channel');
  //   const giveawayDuration = interaction.options.getString('duration');
  //   const giveawayWinnerCount = interaction.options.getInteger('winners');
  //   const giveawayPrize = interaction.options.getString('prize');
  //   const color = getRoleColor(interaction.guild);

  //   if (giveawayChannel.type != ChannelType.GuildText) {
  //     return interaction.reply({
  //       content: 'Please select a text channel.',
  //       ephemeral: true
  //     });
  //   }
  //  if(isNaN(ms(giveawayDuration))) {
  //   return interaction.reply({
  //     content: 'Please select a valid duration!',
  //     ephemeral: true
  //   });
  // }
  //   if (giveawayWinnerCount < 1) {
  //     return interaction.reply({
  //       content: "Please select a winner count that is greater than or equal to one.",
  //     })
  //   }

  //   const bonusRole = interaction.options.getRole('bonusrole')
  //   const bonusEntries = interaction.options.getInteger('bonus-entries')
  //   let rolereq = interaction.options.getRole('role')
  //   let invite = interaction.options.getString('invitelink')

  //   if (bonusRole) {
  //     if (!bonusEntries) {
  //       return interaction.reply({
  //         content: `You must specify how many bonus entries ${bonusRole} would recieve!`,
  //         ephemeral: true
  //       });
  //     }
  //   }


  //   await interaction.deferReply({ ephemeral: true })
  //   let reqinvite;
  //   if (invite) {
  //     let invitex = await client.fetchInvite(invite)
  //     let client_is_in_server = client.guilds.cache.get(
  //       invitex.guild.id
  //     )
  //     reqinvite = invitex
  //     if (!client_is_in_server) {
  //       return interaction.editReply({
  //         embeds: [{
  //           color: color,
  //           author: {
  //             name: client.user.username,
  //             iconURL: client.user.displayAvatarURL() 
  //           },
  //           title: "Server Check!",
  //           description:
  //             "Make sure I'm in the server that you chose as a giveaway requirement.",
  //           timestamp: new Date(),
  //           footer: {
  //             iconURL: client.user.displayAvatarURL(),
  //             text: "Server Check"
  //           }
  //         }]
  //       })
  //     }
  //   }

  //   if (rolereq && !invite) {
  //     messages.inviteToParticipate = `**React with 🎉 to participate!**\n>>> - Only members having ${rolereq} are allowed to participate in this giveaway!`
  //   }
  //   if (rolereq && invite) {
  //     messages.inviteToParticipate = `**React with 🎉 to participate!**\n>>> - Only members having ${rolereq} are allowed to participate in this giveaway!\n- Members are required to join [this server](${invite}) to participate in this giveaway!`
  //   }
  //   if (!rolereq && invite) {
  //     messages.inviteToParticipate = `**React with 🎉 to participate!**\n>>> - Members are required to join [this server](${invite}) to participate in this giveaway!`
  //   }


  //   // start giveaway
  //   client.giveawaysManager.start(giveawayChannel, {
  //     // The giveaway duration
  //     duration: ms(giveawayDuration),
  //     // The giveaway prize
  //     prize: giveawayPrize,
  //     // The giveaway winner count
  //     winnerCount: parseInt(giveawayWinnerCount),
  //     // BonusEntries If Provided
  //     bonusEntries: [
  //       {
  //         // Members who have the role which is assigned to "rolename" get the amount of bonus entries which are assigned to "BonusEntries"
  //         bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${bonusRole ?.name}\') ? ${bonusEntries} : null`),
  //         cumulative: false
  //       }
  //     ],
  //     // Messages
  //     messages,
  //     extraData: {
  //       server: reqinvite == null ? "null" : reqinvite.guild.id,
  //       role: rolereq == null ? "null" : rolereq.id,
  //     }
  //   });
  //   interaction.editReply({
  //     content:
  //       `Giveaway started in ${giveawayChannel}!`,
  //     ephemeral: true
  //   })

  //   if (bonusRole) {
  //     let giveaway = new EmbedBuilder()
  //       .setAuthor({ name: `Bonus Entries!` })
  //       .setDescription(
  //         `**${bonusRole}** has **${bonusEntries}** Extra Entries in this giveaway!`
  //       )
  //       .setColor(color)
  //       .setTimestamp();
  //     giveawayChannel.send({ embeds: [giveaway] });
  //   }
return interaction.reply("The Giveaway Module has temporarily been disabled due to a recent update Discord.js made to their library that broke the package I used to for the Giveaway commands. To be kept up to date on when the commands will come back, join the support server: https://discord.gg/zPzwgzczHz")
  }

};