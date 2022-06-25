const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');



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

    // const options = interaction.options._hoistedOptions
    
    // const user = interaction.option
    // const reason = interaction.options.getString('reason');

  if(!interaction.isCommand()) return;


    // const totalBans = await interaction.guild.bans.fetch()

    // const userToUnban = totalBans.find(x => x.user.id === user.value || x.user.username === user.value || x.user.tag === user.value);

    
    // const author = interaction.member.user.username;

    // const guild = interaction.guild;

    // let color = getRoleColor(interaction.guild);
    // const unbanEmbed = new MessageEmbed()
    //   .setColor(color)
    //   .setTitle(`***Unbanned!***`)
    //   .setDescription(`Successfully unbanned ${user}! || ${reason}`)
    //   .setTimestamp();
    
    // await guild.members.unban(user)
    
    // interaction.reply({embeds: unbanEmbed})

    const options = interaction.options;

      const target = options.get('userid')?.value;

      // default embed
      const embed = new MessageEmbed().setColor("BLURPLE");


      const totalbans = await interaction.guild.bans.fetch()


      // we will match three conditions 1. id, 2. username, 3. tag
      //const userToUnban = totalbans.find(x => x.user.id === user?.value || x.user.username === user?.value || x.user.tag === user?.value)

      // let userTag;
      // if (!userToUnban) {
      //   embed.setDescription(`Invalid User or User is Not Banned`)
      //   return await interaction.reply({embeds: [embed]})
      // }

      //userTag = userToUnban.user.tag || "User";

      await interaction.guild.bans.remove(target);

      embed.setColor('BLURPLE').setDescription(` Successfully unbanned <@${target}>.`)
      await interaction.reply({embeds: [embed]})
  }
}

