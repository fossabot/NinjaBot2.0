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
   .setTitle("Ninja Bot Commands")
   .setDescription(`<@${message.author.id}>` + "Below is a list of my commands and their usage.")
   .setColor("#0x3dfbff")
   .addBlankField()
   .addField("Required", "``{}`` -> Required Field")
   .addField("Not Required", "``[]`` -> Not Required Field")
   .addBlankField()
   .addField("nb/owncmds", "Shows a list of my ***OWNER/DEV*** only commands")
   .addField("nb/helpcmds", "Shows a list of my available help commands")
   .addField("nb/admcmds", "Shows a list of my available admin commands")
   .addField("nb/modcmds", "Shows a list of my available moderation commands")
   .addField("nb/funcmds", "Shows a list of my available fun commands/games")
   .addField("nb/ticketcmds", "Shows a list of my available support ticket commands")
   .setFooter(`© Ninja Bot v1.00`);
   message.channel.send(hEmbed)
 }
