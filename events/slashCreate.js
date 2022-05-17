const ms = require('ms-prettify').default;

module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client } = interaction;

		// Checks if the interaction is a command (to prevent weird bugs)

		if (!interaction.isCommand()) return;
		/**
		 * @description The Interaction command object
		 * @type {Object}
		 */

		const command = client.commands.get(interaction.commandName);

		// If the interaction is not a command in cache.

		if (!command) return;

		// A try to executes the interaction.

		try {
      const t = client.cooldowns.get(`${interaction.user.id}_${command.name}`) || 0;
     if (Date.now() - t < 0) return interaction.reply({ content: `You are on a cooldown of ${ms(t - Date.now(), { till: 'second' })}`, ephemeral: true });

        client.cooldowns.set(`${interaction.user.id}_${command.name}`, Date.now() + (command.cooldown || 0));
			await command.execute(interaction);
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "There was an issue while executing that command!",
				ephemeral: true,
			});
		}
	},
};