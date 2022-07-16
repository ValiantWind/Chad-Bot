# Chad Bot

A Multipurpose Discord Bot coded with Discord.js with various different commands.

Features:
- Uses Slash Commands
- A Full Moderation System
- A Complete Giveaway System
- Lots of Fun Commands
- Lots of Informational Commands
- Some Roblox Commmands

 View the full command list at the bottom of this README.
 
 ***

What makes this Discord bot different from the rest is that it has absolutely no paywall. 

Everything feature, is, and always will be, free. I didn't make this bot to profit off of it. I made it with my freetime to make people who use it happy that they can use every single feature on this bot without paying anything.

Of course, donations are always appreciated, but this bot will always be 100% free.

It has 24/7 hosting, and I plan to get it verified when, or if, it reaches 75 servers. I hope this bot is useful to a lot of people.

***

A few things to note:

- You might notice occasionally that the bot appearing offline and online and offline. Its because I'm restarting the bot to test new commands or apply changes.
-

## Contributing
- Currently I'm working on this bot alone, but if you have commands that you would like to add to the bot, then follow the steps below:

1. Fork this repository
2. Add a Command to any category you like using the following template:
```javascript
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('COMMAND_NAME_HERE')
    .setDescription(`COMMAND_DESCRIPTION`)
    
    <Add needed options here>
    
  cooldown: 5000,
  category: 'CATEGORY NAME',
  usage: '/command_name <arg>',
  async execute(interaction) {

  if(!interaction.isCommand()) return; // Make sure you include this
    

  }
}
```
The command format I use is @discordjs/builders.

Learn about it [here](https://github.com/discordjs/discord.js/tree/main/packages/builders)

I hope lots of people find use of this bot. Have a good day :D

### License

This repo is registered under the MIT License. (Just make sure you pls give credit :D )
