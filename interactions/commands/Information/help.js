const { readdirSync } = require("fs");
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRoleColor } = require('../../../utils/getRoleColor');
const client = require('../../../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription(' Displays all the Commands in each category, or the details of a specific command.')
    .addStringOption((option) =>
			option
				.setName("command")
				.setDescription("The specific command to see the info of.")
		),
    category: "Information",
    cooldown: 5000,
    usage: '/help <command (optional)>',
    async execute(interaction){
      if(!interaction.isCommand()) return;
      
      const color = getRoleColor(interaction.guild)

        const commandInt = interaction.options.getString("command");
        if (!commandInt) {

            // Get the slash commands of a Bot category
            const infoCommandsList = [];
            readdirSync(`./interactions/commands/Information`).forEach((file) => {
                const filen = require(`../../commands/Information/${file}`);
                const name = `\`${filen.data.name}\``
                infoCommandsList.push(name);
            });

            // Get the slash commands of a Utility category
            const modCommandsList = [];
            readdirSync(`./interactions/commands/Moderation`).forEach((file) => {
                const filen = require(`../../commands/Moderation/${file}`);
                const name = `\`${filen.data.name}\``
                modCommandsList.push(name);
            });


          const funCommandsList = [];
            readdirSync(`./interactions/commands/Fun`).forEach((file) => {
                const filen = require(`../../commands/Fun/${file}`);
                const name = `\`${filen.data.name}\``
                funCommandsList.push(name);
            });
          const robloxCommandsList = [];
            readdirSync(`./interactions/commands/Roblox`).forEach((file) => {
                const filen = require(`../../commands/Roblox/${file}`);
                const name = `\`${filen.data.name}\``
                robloxCommandsList.push(name);
            });
          const giveawayCommandsList = [];
            readdirSync(`./interactions/commands/Giveaways`).forEach((file) => {
                const filen = require(`../../commands/Giveaways/${file}`);
                const name = `\`${filen.data.name}\``
                giveawayCommandsList.push(name);
            });

          
            // This is what it commands when using the command without arguments
            const helpEmbed = new MessageEmbed()
                .setTitle(`Help Menu`)
                .setDescription(`\n**Total Slash Commands:** ${client.commands.size}`)
                .addField("Information Slash Commands", infoCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("Moderation Slash Commands", modCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("Fun Slash Commands", funCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("Roblox Slash Commands", robloxCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("Giveaway Slash Commands", giveawayCommandsList.map((data) => `${data}`).join(", "), true)
                .setColor(color)
                .setTimestamp()

            interaction.reply({ embeds: [helpEmbed] });
        } else {
            let command = client.commands.get(commandInt.toLowerCase());

            // This is what it sends when using the command with argument and it does not find the command
            if (!command) {
                interaction.reply({ content: `There aren't any Slash Commands named "${commandInt}"` });
            } else {

                // This is what it sends when using the command with argument and if it finds the command
                //let command = client.commands.get(commandInt.toLowerCase());
                let name = command.data.name;
                let description = command.data.description || "No description provided."
                let cooldown = command.cooldown || 'No cooldown'
                let category = command.category || 'No category provided.'
              let usage = command.usage || 'No Usage Provided';

                let helpCmdEmbed = new MessageEmbed()
                    .setTitle(`\`${(name.toLocaleString())}\` Slash Command Info`)
                    .setDescription('')
                    .addFields(
                        { name: "Description", value: `${description}` },
                      { name: 'Category', value: `${category}` },
                        { name: 'Cooldown (in seconds)', value: `${cooldown / 1000}` },
                      { name: 'Usage', value: `${usage}` }
                    )
                    .setColor(color)
                    .setTimestamp()

                interaction.reply({ embeds: [helpCmdEmbed] });
            }
        }
    },
};