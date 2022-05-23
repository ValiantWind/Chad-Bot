const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const db = require('../../../models/warndb');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('modlogs')
    .setDescription(`Displays the number of modlogs a user has.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to view the modlogs of.`)
      .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  async execute(interaction) {
    const author = interaction.member.user.username;
    const member = interaction.options.getMember('user') || author;
    const color = getRoleColor(interaction.guild)
    let warns = await db.fetch(`warns_${member.id}`);
    let mutes = await db.fetch(`mutes_${member.id}`);
    let kicks = await db.fetch(`kicks_${member.id}`);
    let bans = await db.fetch(`bans_${member.id}`);
    if(warns == null){ 
      warns = 0;
    }
    if(mutes == null){
      mutes = 0;
    }
    if(kicks == null){
      kicks = 0;
    }
    if(bans == null){
      bans = 0;
    }

    db.findOne({ guildId: interaction.guild.id, user: member.user.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`${member.user.tag}'s warns`)
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`
                        )
                    )
                    .setColor("BLUE")
                )
            } else {
                message.channel.send('User has no data')
            }

        })
    let embed = new MessageEmbed()
        .setTitle(`Mod Logs of ${member.tag || member.user.tag}`)
        .setDescription(`Total Mod Logs: ${warns}`)
        .addField('Total Warnings: ', warns.toString(), true)
        .addField('Total Mutes', mutes.toString(), true)
        .addField('Total Kicks : ', kicks.toString(), true)
        .addField('Total Bans :', bans.toString(), true)
        .setTimestamp()
        .setColor(color)
    interaction.reply({ embeds: [embed] })
  }
}