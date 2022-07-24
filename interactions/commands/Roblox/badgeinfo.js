require('dotenv').config;
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, InteractionType } = require('discord.js');
const fetch = require('node-fetch');
const noblox = require('noblox.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('badgeinfo')
		.setDescription('Displays info about a Roblox badge.')
  .addStringOption((option) => option
    .setName('badgeid')
    .setDescription('The ID of the Roblox Badge you want to view the info of.')
    .setRequired(true)
  ),
  cooldown: 5000,
  category: 'Information',
  usage: '/badgeinfo <badgeid>',
	async execute(interaction) {

   if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    

    const badgeId = interaction.options.getString('badgeid');

     const badgeInfo = await noblox.getBadgeInfo(badgeId);
    // const response = await fetch(`https://thumbnails.roblox.com/v1/badges/icons?badgeIds=${badgeId}&size=150x150&format=Png&isCircular=true`);

    // const thumbnailData = (await response.json()).data

    // const thumbnailUrl = await thumbnailData.imageUrl

    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Group Link')
					.setStyle('Link')
          .setURL(`https://roblox.com/badges/${badgeId}/`)
			);
    
    
   try {

      const embed = new EmbedBuilder()
        .setTitle(`Info for the "${badgeInfo.name}" Badge`)
        .setDescription(`Earn this Badge from ${badgeInfo.awardingUniverse.name}` || 'Unknown Badge Origin')
        .addFields(
          {name: 'Description', value: badgeInfo.description || 'No Description'},
          {name: 'Enabled?', value: badgeInfo.enabled.toString() || 'Not Available'},
          {name: 'Number of times awarded', value: badgeInfo.statistics.awardedCount.toString() || 'Not Available'},
          {name: 'Number of times awarded yesterday', value: badgeInfo.statistics.pastDayAwardedCount.toString() || 'Not Available'},
          {name: 'Created At', value: badgeInfo.created.toDateString() || 'Not Available'},
          {name: 'Last Updated', value: badgeInfo.updated.toDateString() || 'Not Available'}
        )
        // .addField('Description', badgeInfo.description || 'No Description')
        // .addField('Enabled?', badgeInfo.enabled.toString() || 'Not Available')
        // .addField('Number of times awarded', badgeInfo.statistics.awardedCount.toString() || 'Not Available')
        // .addField('Number of times awarded yesterday', badgeInfo.statistics.pastDayAwardedCount.toString() || 'Not Available')
        // .addField('Created At', badgeInfo.created.toDateString() || 'Not Available')
        // .addField('Last Updated', badgeInfo.updated.toDateString() || 'Not Available')
        .setColor('BLURPLE')
        .setURL(`https://www.roblox.com/badges/${badgeId}`)
        .setTimestamp()
        //.setThumbnail(thumbnailUrl)
      interaction.reply({embeds: [embed]})
   } catch {
      interaction.reply('An Error occured. Make sure the Badge ID you typed you provided is valid.')
}
    
	},
};