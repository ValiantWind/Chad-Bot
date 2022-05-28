 const { MessageEmbed, TextChannel } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment');
const { getRoleColor } = require('../../../utils/getRoleColor');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("githubinfo")
    .setDescription("Displays information about a specific GitHub User.")
    .addStringOption((option) => option
      .setName("user")
      .setDescription("The GitHub user you want to view info about.")
      .setRequired(true)
    ),
  cooldown: 3000,
  category: 'Information',
  usage: '/githubinfo <github username>',
  async execute(interaction) {
    const color = getRoleColor(interaction.guild)
    const username = interaction.options.getString("user");

  if(!interaction.isCommand()) return;

    
    try {
      fetch(`https://api.github.com/users/${username}`)
        .then(response=>response.json().then(data=>{
            //console.log(data)

          let creationDate = new Date(data.created_at)
          let updateDate = new Date(data.updated_at)
          let id = data.id
          let avatarUrl = `https://avatars.githubusercontent.com/u/${id}?v=4`
  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(`${username}'s GitHub Profile`)
    .setURL(data.html_url)
    .setThumbnail(avatarUrl)
    .setDescription('**Description:** ' + data.bio || 'No Description')
    .addField('Follower Count', data.followers.toString(), true)
    .addField('Following Count', data.following.toString(), true)
    .addField('Public Repo Count', data.public_repos.toString(), true)
    .addField('Blog', data.blog || 'Not Available')
    .addField('Location', data.location || 'Not Available', true)
    .addField('Company', data.company || 'Not Available', true)
    .addField('Twitter', data.twitter_username || 'Not Available')
    .addField('Created At', creationDate.toDateString(), true)
    .addField('Last Updated At', updateDate.toDateString(), true)
    interaction.reply({embeds: [embed]})
            }));
    } catch(error) {
      console.log(error)
      interaction.reply({content: 'An error occured. Make sure the username you typed in is valid and exists!'})
    }
  }
};