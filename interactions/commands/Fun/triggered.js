const { SlashCommandBuilder } = require('@discordjs/builders');
const { Canvas } = require('canvacord');
const { MessageAttachment } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('triggered')
		.setDescription("Why you so mad bro")
    .addUserOption((option) => option
      .setName('user')
      .setDescription('Person to trigger')
      ),
  cooldown: 30000,
  category: 'Fun',
	async execute(interaction) {
    const user = interaction.options.getMember('user');
        const avatar = user.displayAvatarURL({ size: 2048, format: "png" });

        const image = await Canvas.trigger(avatar);

        const attachment = new MessageAttachment(image, "xopbottriggered.gif");
        return interaction.reply({ files: [{ attachment: image }] });
	},  
};