 const { MessageEmbed, TextChannel } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const noblox = require('noblox.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("assetinfo")
    .setDescription("Displays information about a specific Roblox Asset in the catalog or Marketplace.")
    .addIntegerOption((option) => option
      .setName("assetid")
      .setDescription("ID of the asset you want to view the info of.")
      .setRequired(true)
    ),
  cooldown: 3000,
  category: 'Roblox',
  usage: '/assetinfo <roblox asset id>',
  async execute(interaction) {
    const color = getRoleColor(interaction.guild)
    const assetId = interaction.options.getInteger("assetid");

    if(!interaction.isCommand()) return;
    
    await interaction.deferReply();
  
    try {
      const productInfo = await noblox.getProductInfo(assetId)
      let isLimited;
      if(productInfo.IsLimited === false){
        isLimited = 'No'
      } else if(productInfo.IsLimited === true) {
        isLimited = 'Yes'
      }

      let saleStatus;
      if(productInfo.IsForSale === false){
        saleStatus = 'No'
      } else if(productInfo.IsForSale === true){
        saleStatus = 'Yes'
      }
        let isNew;
      if(productInfo.IsNew === false){
        isNew = 'No'
      } else if(productInfo.IsNew === true){
        isNew = 'Yes'
      }
  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(`${productInfo.Name}'s Info`)
    .addField('Name', productInfo.Name|| 'No Owner')
    .addField('ID', productInfo.AssetId.toString())
    .addField('Description', productInfo.Description || 'No Description')
    .addField('Asset Creator', productInfo.Creator.Name)
    .addField(`Created at`, productInfo.Created.toString())
    .addField('Last Updated at', productInfo.Updated.toString())
    .addField('New?', isNew)
    .addField('On Sale?', saleStatus)
    .addField('Sales Count', productInfo.Sales.toString())
    .addField('Price', productInfo.PriceInRobux.toString())
    .addField('Limited?', isLimited)
    .setTimestamp()
    //.setThumbnail(groupLogo)

    interaction.editReply({embeds: [embed]})
    } catch(error) {
      console.log(error)
      interaction.editReply({content: 'An Error occured. Make sure the asset id you typed in is valid and exists.', ephemeral: true})
    }
  }
};