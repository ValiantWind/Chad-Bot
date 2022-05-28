const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

const clashApiUrl = 'https://proxy.royaleapi.dev/v1/players/%23C0G20PR2'


module.exports = {
	data: new SlashCommandBuilder()
		.setName('clashuserinfo')
		.setDescription('Displays information about a Clash Royale User.')
  .addStringOption((option) => option
    .setName('tag')                
    .setDescription('The Profile Tag of the Clash Royale user you want to view the info of. (NO HASHTAG)')      
    .setRequired(true)
  ),
  cooldown: 5000,
  category: 'Clash Royale',
  usage: '/clashuserinfo <profile tag> (NO HASHTAG)',
	async execute(interaction) {
    const tag = interaction.options.getString('tag');

    if(!interaction.isCommand()) return;
    

    const clashApiUrl = `https://proxy.royaleapi.dev/v1/players/%23${tag}.json`

    interaction.reply(clashApiUrl)


    //   try {

    // const embed = new MessageEmbed()
    //     .setTitle(`Player Info of ${playerInfo.name}`)
    //     .setDescription('')
    //     .addField('Current Arena', playerInfo.arena.name)
    //     .addField('XP Level', playerInfo.expLevel.toString())
    //     .addField('Current Trophy Count', playerInfo.trophies.toString())
    //     .addField('Best Trophy Count', playerInfo.bestTrophies.toString())
    //     .addField('Total Wins', playerInfo.wins.toString())
    //     .addField('Total Losses', playerInfo.losses.toString())
    //   .addField('Total 3 Crown Wins', playerInfo.threeCrownWins.toString())
    //     .addField('Total Battles Played', playerInfo.battleCount.toString())
    //     .addField('Total Tournament Battles Played', playerInfo.tournamentBattleCount.toString())
    //     .addField('Clan', playerInfo.clan.name)
    //     .addField('Role In Clan', playerInfo.role)
        
          
    //   interaction.reply({embeds: [embed]});
    //   } catch(e) {
    //   interaction.reply('An Error Occured. Make sure that the tag you typed in is valid and that the tag you provided does not include the hashtag.');
    //   }
	},
};