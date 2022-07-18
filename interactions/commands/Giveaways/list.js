const { ActionRow, EmbedBuilder, SelectMenu, InteractionType } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('glist')
      .setDescription('List all the current running giveaways in this server.'),
    cooldown: 10000,
    category: "Giveaways",
    usage: '/glist <giveaway message id>',
    async execute(interaction, client) {

      
       if(interaction.type != InteractionType.ApplicationCommand) return;
      
  //       const select = new SelectMenu().setCustomId("select").setPlaceholder("Select a type of giveaway to view!").addOptions([
  //           {
  //             label: '🎉 Normal Giveaways',
  //             description: 'Check the normal giveaways currently running in your server!',
  //             value: 'normal',
  //           },
  //           {
  //             label: "⚙ Guild Requirement Giveaways!",
  //             description: "Check the giveaways running with a guild requirement!",
  //             value: "guildReq"
  //           },
  //         ])
  //         const row = new ActionRow().addComponents([select])
  //         let giveaways = client.giveawaysManager.giveaways.filter(g => g.guildId === `${interaction.guild.id}` && !g.ended);
  //         if (!giveaways.some(e => e.messageId)) {
  //           return interaction.reply('There are no currently running giveaways in this server.')
  //         }
  // const msg = await interaction.channel.send({ embeds: [new EmbedBuilder().setDescription("Choose an option in the select menu to get started!").setColor('BLURPLE').setTimestamp()], components: [row] })
  //         let embed = new EmbedBuilder()
  //           .setTitle("Currently Running Giveaways")
  //           .setColor('BLURPLE')
  //           .setFooter({
  //              text: `Requested by ${interaction.user.username}`,
  //              iconURL: interaction.user.displayAvatarURL()
  //           })
  //           .setTimestamp()
  //         let embedGuild = new EmbedBuilder()
  //           .setTitle("Currently Running Join Requirement Giveaways")
  //           .setColor('BLURPLE')
  //           .setFooter({
  //              text: `Requested by ${interaction.user.username}`,
  //              iconURL: interaction.user.displayAvatarURL()
  //           })
  //         .setTimestamp()
  //         const filter = x => x.customId == "select" && x.user.id == interaction.member.id
  //         const collector = await interaction.channel.createMessageComponentCollector({ filter, time: 60000, max: 1 })
  //         await interaction.deferReply()
  //         collector.on("collect", async (i) => {
  //           const val = i.values[0]
  //           if (val == "normal") {
  //             await Promise.all(giveaways.map(async (x) => {
  //               embed.addField(`Normal Giveaway:`, `**Prize:** **[${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId})\nStarted at:** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**Ends at:** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`)
  //             }));
  //             msg.delete()
  //             interaction.editReply({ embeds: [embed], components: [] })
  //           }
  //           if (val == "guildReq") {
  //              if (val == "guildReq") {
  //             if (!giveaways.some(e => e.extraData)){  interaction.editReply({ content: 'There are no currently running giveaways with requirements in this server.', embeds: [], components: [] })
  //              msg.delete()
  //              return
  //           }
  //              }
  //             await Promise.all(giveaways.map(async (x) => {
  //               if (x.extraData) {
  //                 const guild = client.guilds.cache.get(x.extraData.server)
  //                 const channel = guild.channels.cache
  //                   .filter((channel) => channel.type === 'text')
  //                   .first()
  //                 const inv = await channel.createInvite()
  //                 embedGuild.addField(`Join Requirement Giveaway:`, `**Prize:** **[${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId})**\n**Requirement: [This Server](${inv})**\n**Started at:** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**Ends at:** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`)
  //               }
  //             }));
  //             msg.delete()
  //             interaction.editReply({ embeds: [embedGuild], components: [] })
              
  //           }
  //         })
  //         collector.on("end",(collected, reason) => {
  //           if(reason == "time"){
  //        interaction.editReply({ content: "Collector ended, Try Again!", components: [] })
  //           }
  //       })  

      return interaction.reply("The Giveaway Module has temporarily been disabled due to a recent update Discord.js made to their library that broke the package I used to for the Giveaway commands. To be kept up to date on when the commands will come back, join the support server: https://discord.gg/zPzwgzczHz")
    },
};