//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone : true,
  fetchAllMembers : true
});
 
const config = require("../data/config.json");
const fs = require("fs");
const snekfetch = require('snekfetch');

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = async (client, message, args) => {
 
//This is your Command or Discord Rich Embed code Line followed by the end of the command. OR close "}" bracket
 message.delete().catch();	 
   let hEmbed = new Discord.RichEmbed()
   .setTitle("Ninja Bot Help Commands")
   .setDescription(`<@${message.author.id}>` + "Below is a list of my commands and their usage.")
   .setColor("#0x3dfbff")
   .addBlankField()
   .addField("Required", "``{}`` -> Required Field")
   .addField("Not Required", "``[]`` -> Not Required Field")
   .addBlankField()
   .addField("Ping", "``nb/ping`` Pings the bot and checks Latency & Response time")
   .addField("about", "``nb/about`` Tells you all about Ninja Bot")
   .addField("Server Info", "``nb/serverinfo`` Shows you information about the current server")
   .addField("Server List", "``nb/serverlist`` Shows you a list of Servers the bot is currently in")
   .addField("User Info", "``nb/userinfo {@user}`` Shows you info about the mentioned user")
   .addField("Bot Vote", "``nb/botvote`` Generates a link for you to vote for the bot on the Discord Bot List")
   .addField("Bot Uptime", "``nb/uptime`` Shows you the bots uptime since last restart")
   .setFooter(`© Ninja Bot v1.00`);   
   message.channel.send(hEmbed)
 }
