 const { MessageEmbed, TextChannel } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment');
const { getRoleColor } = require('../../../utils/getRoleColor');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("repo")
    .setDescription("Displays information about a specific GitHub Repository.")
    .addStringOption((option) => option
      .setName("name")
      .setDescription("The FULL GitHub Repository name you want to view info about. (i.e. 'ValiantWind/portfolio') ")
      .setRequired(true)
    ),
  cooldown: 3000,
  category: 'Information',
  async execute(interaction) {
    const color = getRoleColor(interaction.guild)
    const repository = interaction.options.getString("name");



    
    try {
      fetch(`https://api.github.com/repos/${repository}`)
        .then(response=>response.json().then(data=>{
            //console.log(data)

          let creationDate = new Date(data.created_at)
          let updateDate = new Date(data.updated_at)
          let id = data.owner.id
          let avatarUrl = `https://avatars.githubusercontent.com/u/${id}?v=4`
  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(`${repository} Repository Information`)
    .setURL(data.html_url)
    .setThumbnail(avatarUrl)
    .setDescription('**Description:** ' + data.description || 'No Description')
    .addField('Fork?', data.fork || 'false')
    .addField('Star Count', data.stargazers_count.toString(), true)
    .addField('Fork Count', data.forks_count.toString(), true)
    .addField('Watcher Count', data.watchers_count.toString(), true)
    .addField('Open Issues Count', data.open_issues_count.toString(), true)
    .addField('Default Branch', data.default_branch || 'Not Available')
    .addField('Template?', data.is_template || 'false', true)
    .addField('Archived?', data.archived || 'false', true)
    .addField('License', data.license.name || 'No License')
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