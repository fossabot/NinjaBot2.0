//These are the required node modules, DO NOT touch these.
const Discord = require("discord.js");
const Music = require('discord.js-musicbot-addon');
const Enmap = require("enmap");
const fs = require("fs");
const snekfetch = require('snekfetch');
const talkedRecently = new Set();
const token = process.env.BOT_TOKEN; //Replace with config.token if self hosting and define the token in the config. 
const client = new Discord.Client();
const config = require('./data/config.json');
client.config = config;

//This is the bots startup log output and playing status.
client.on("ready",  async () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setGame(`nb/help in ${client.guilds.size} Servers`, `https://www.twitch.tv/monstercat`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`nb/help in ${client.guilds.size} Servers`, `https://www.twitch.tv/monstercat`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`nb/help in ${client.guilds.size} Servers`, `https://www.twitch.tv/monstercat`);
});

//Allows the bot to log and show events (Joining New Servers)
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

//This function allows the bot to respond to @mention for commands
//Here this code is only Executed for "prefix" but you will find this code in all the commands.
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
let prefix = ('nb/');

client.on('message', message => {
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const command = args.shift();


//Stops the bot from responding to other bots.
client.on('message', message => {
  if(message.author.bot) return;
})

//This code line allows the commands to be individual/seperate files
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

//These lines are required for implimenting music features. 
Music.start(client, {
  youtubeKey: "AIzaSyDu_YZn7ivq66a3baryXztxK8rFrERAKvA",
  prefix: config.prefix, // Prefix for the commands.
  global: true,            // Non-server-specific queues.
  maxQueueSize: 60,        // Maximum queue size of 25.
  clearInvoker: true,      // If permissions applicable, allow the bot to delete the messages that invoke it.
  helpCmd: 'musichelp',        // Sets the name for the help command.
  playCmd: 'play',        // Sets the name for the 'play' command.
  volumeCmd: 'volume',     // Sets the name for the 'volume' command.
  leaveCmd: 'begone',      // Sets the name for the 'leave' command.
  disableLoop: false        // Disable the loop command.
  });

});
client.login(process.env.BOT_TOKEN); //process.env.BOT_TOKEN Allows the token to be defined and set via the bots database to ensure it is never public!
