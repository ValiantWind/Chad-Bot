require('dotenv').config;

const fs = require('fs');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fetch = require('node-fetch');
const token = process.env.token
const clientId = process.env.clientId
const guildId = process.env.guildId

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
client.userPermissions = new Collection();
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


///////////////Buttons///////////////////

const buttonCommands = fs.readdirSync("./interactions/buttons");

for (const module of buttonCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/buttons/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/buttons/${module}/${commandFile}`);
		client.buttonCommands.set(command.id, command);
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



const rest = new REST({ version: "9" }).setToken(token);

const commandJsonData = [
	...Array.from(client.commands.values()).map((c) => c.data.toJSON()),
];

(async () => {
	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(

			Routes.applicationCommands(clientId, guildId),
			{ body: commandJsonData }
		);

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();



async function getLatestPosts() {
     await fetch('https://devforum.roproxy.com/c/updates/45.json')
    .then(res => res.json())
    .then(function(data){
        let notificationChannel = client.channels.cache.get('972668944597004339')
        let topicList = data.topic_list;
        let topics = topicList.topics;
        // read each topic
        topics.forEach(topic => {
            let createdAt = topic.created_at;
            let date = new Date();
            // embed data
            let id = topic.id // topic id
            let title = topic.title
            // check if the topic was created today
            let currentDay = date.getUTCDate();
            let currentMonth = date.getUTCMonth() + 1;
            let currentYear = date.getUTCFullYear();
            // get created at args
            let timeArgs = createdAt.split("-") // split the created at string to get each arg
            let createdDay = timeArgs[2];
            let createdMonth = timeArgs[1];
            let createdYear = timeArgs[0]

            createdDay = createdDay.split("T")[0] // seperate the rest of the time to get ONLY the day
            
            // now check if the topic was created today
            //currentDay === createdDay && currentMonth === createdMonth && currentYear === createdYear
            if (currentDay == createdDay && currentMonth == createdMonth && currentYear == createdYear)
            {
                console.log('Passed through date check')
                // add embed
                const embedData = {
                    color: "#f50404",
                    author: {
                        name: 'New Roblox Update!',
                        url: `https://devforum.roblox.com/t/${id}`,
                    },
                    fields: [
                        {
                            name: title,
                            value: "New Roblox Update!",
                        }
                    ]
                }
                // send embed
                notificationChannel.send({ embeds: [embedData] });
               
            }
            setTimeout(() => {}, 1000);
        });
    })
}

client.once('ready', () => {
	//getLatestPosts()
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
