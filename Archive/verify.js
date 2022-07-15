require('dotenv').config;
const { SlashCommandBuilder } = require('@discordjs/builders');
const robloxuserdb = require('../../../models/robloxuserdb');
const fetch = require('node-fetch');
const noblox = require('noblox.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Link your Roblox Account to your Discord Account. (Uses RoVer API)'),
  cooldown: 5000,
  category: 'Roblox',
  usage: '/verify',
	async execute(interaction) {

    if(!interaction.isCommand()) return;


      const res = await fetch(`https://verify.eryn.io/api/user/${interaction.user.id}`);

    function makeid() {
    var text = "";
    var selectFruit = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😲','😝','🤑','🤯','😭','😑','😶','😋','🙆','👉','👇','🧠','💼','👮🏻','👍🏼','👎🏼','🐵','🌨','☁️','💧','🎬','🎧','🎮','🎲','🏅','🥇','🥈','🥉','🏆','🏒','🍎','🍫','🍿','🍪','🥛','🍽','🍴','🐑','🦀','🐔','🐭','🦊','🐧','🐞','🌍','🌏','🌕','🌖','🌚','🌝','🌵','🎄','🌲','☀️','⛅️','☔️','🍋']; // Emoji list This can be used for words.
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)]; // This will random the emojis 
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    return text;
  }

      const success = await res.json()

      if(success.status === 'ok'){
        interaction.reply(`Successfully verified as ${success.robloxUsername}!`)
        new robloxuserdb({
    userId: user.id,
    guildId: interaction.guildId,
    robloxUsername: success.robloxUsername,
    robloxUserId: success.robloxId,
  }).save();
      } else if(success.status === 'error'){
        
      }

      interaction.reply('Owner test lol')
    
	},
};