const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { getRoleColor } = require('../../../utils/getRoleColor');
const client = require('../../../index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help2")
		.setDescription(
			"List all commands of bot or info about a specific command."
		)
		.addStringOption((option) =>
			option
				.setName("command")
				.setDescription("The specific command to see the info of.")
		),
cooldown: 3000,
  category: 'Information',
	async execute(interaction) {
		 // let btnraw = new MessageActionRow().addComponents([
   //    new MessageButton()
   //      .setStyle("LINK")
   //      .setLabel("Invite Now")
   //      .setURL(
   //        `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`
   //      ),
   //  ]);
    const color = getRoleColor(interaction.guild)
    let homeEmbed = new MessageEmbed()
      .setColor(color)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`>>> Total ${client.commands.size} Commands`)
      .setTitle(`Information About ${client.user.username}`);

    const commands = (category) => {
      return client.commands
        .filter((module) => module.category === category)
        .map((module) => `\`${module.data.name}\``);
    };

    try {
      for (let i = 0; i < client.categories.length; i++) {
        const current = client.categories[i];
        const items = commands(current);
        homeEmbed.addField(
          `** ${current.toUpperCase()} \`[${items.length}]\` **`,
          `>>> ${items.join(" , ")}`
        );
      }
    } catch (e) {
      console.log(e);
    }

    interaction
      .reply({ embeds: [homeEmbed]})
      .catch((e) => console.log(e));
	},
};