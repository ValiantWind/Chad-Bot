module.exports = {
	data: {
		name: "Info",
		type: 2, // 2 is for user context menus
	},

	async execute(interaction) {
    
		await interaction.reply({
			content: "Context menus coming soon.",
      ephemeral: true,
		});
		return;
	},
};