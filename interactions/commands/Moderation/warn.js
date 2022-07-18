const { InteractionType } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const warndb = require('../../../models/warndb');
const modstatsdb = require('quick.db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription(`Allows a Staff Member with sufficient permissions to warn a member in the server.`)
    .addUserOption((option) => option
      .setName('target')
      .setDescription(`The user that you want to warn.`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're warning this user for.`)
    .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/warn <member> <reason>',
  async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return;
    
    const user = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason') || 'No reason specified';


    if (user.id == interaction.member.user.id) {
      interaction.reply({ content: `Do you want to get yourself demoted my guy?` });
    } else if (interaction.member.roles.highest.comparePositionTo(user.roles.highest) <= 0){
      interaction.reply({ content: `Your roles must be higher than the roles of the person you want to warn!`, ephemeral: true });
  } else if (user.id == 624665686978986020) { // Connor User ID
  interaction.reply({content: "You fool! You can't warn the almighty Co-Owner Conner! Shame on you."});
  } else if (user.id == 561653332414955552){ // Lite User ID
  interaction.reply({content: "You fool! You can't warn the almight Community Manager Lite! Shame on you."});
  } else if (user.id == 787114312279392317){ // Dom User ID
   interaction.reply({content: "You fool! You can't warn the almight YouTuber and Server Owner Dom! Shame on you."});
  } else if (user.id == 791197005832650752){ // Requiem User ID
  interaction.reply({content: "You fool! You can't warn the almight Mod Stats Speedrunner Requiem! Shame on you."});
  } else {

new warndb({
    userId: user.id,
    guildId: interaction.guildId,
    moderatorId: interaction.user.id,
    reason,
    timestamp: Date.now(),
    
  }).save();
  

    user.send(`You have been warned in ${interaction.guild.name} for ${reason}`).catch(console.log);


    interaction.reply({content: `Successfully warned ${user} for ${reason}`});
      modstatsdb.add(`warnModstats_${interaction.member.user.id}`, 1)
      modstatsdb.add(`totalModstats_${interaction.member.user.id}`, 1)  
  }
  }
}