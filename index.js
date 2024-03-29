require('dotenv/config');

const fs = require('fs');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fetch = require('node-fetch');
const token = process.env.token
const clientId = process.env.clientId
const guildId = process.env.guildId
const configdb = require('quick.db');

const client = new Client({
	intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildBans,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.User,
    Partials.Message,
    Partials.Channel,
  ],
});


module.exports = client;

require("./handler")(client);


client.commands = new Collection();
client.categories = new Collection();
client.usages = new Collection();
client.cooldowns = new Collection();
client.userPerms = new Collection();
client.buttonCommands = new Collection();

// const { GiveawaysManager } = require("discord-giveaways");
// client.giveawaysManager = new GiveawaysManager(client, {
//   storage: "./utils/giveaways.json",
//   default: {
//     botsCanWin: false,
//     embedColor: "BLURPLE",
//     reaction: "🎉",
//     lastChance: {
//       enabled: true,
//       content: `**Last chance to enter the giveaway!**`,
//       threshold: 5000,
//       embedColor: 'BLURPLE'
//     }
//   }
// });


///////////////Slash Commands///////////////////

const commands = fs.readdirSync('./interactions/commands')

for (const module of commands) {
	const commandFiles = fs
		.readdirSync(`./interactions/commands/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/commands/${module}/${commandFile}`);
		client.commands.set(command.data.name, command)
	}
}

const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
};



// const rest = new REST({ version: "9" }).setToken(token);

// const commandJsonData = [
// 	...Array.from(client.commands.values()).map((c) => c.data.toJSON()),
// ];

// (async () => {
// 	try {
// 		console.log("Started refreshing application (/) commands.");

// 		await rest.put(

// 			Routes.applicationCommands(clientId),
// 			{ body: commandJsonData }
// 		);

// 		console.log("Successfully reloaded application (/) commands.");
// 	} catch (error) {
// 		console.error(error);
// 	}
// })();


client.once('ready', () => {
});

const express = require('express')
const app = express();
const port = 3000
 
app.get('/', (req, res) => res.send('The Bot is Online.'))
 
app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
);
    
client.login(token);


process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (err, origin) => {
  console.log(`Uncaught Exception: `, err, origin);
  })
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log('Uncaught Exception Monitor', err, origin);
  })
// process.on('multipleResolves', (type, promise, reason) => {
//   console.log('Multiple Resolves:', type, promise, reason);
//   })    
