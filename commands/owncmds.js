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
   .setTitle("Ninja Bot Owner Commands")
   .setDescription(`<@${message.author.id}>` + "Below is a list of my commands and their usage.")
   .setColor("#0x3dfbff")
   .addBlankField()
   .addField("Required", "``{}`` -> Required Field")
   .addField("Not Required", "``[]`` -> Not Required Field")
   .addBlankField()
   .addField("Exec", "``nb/exec {code}`` Executes the given MySQL String")
   .addField("Eval", "``nb/eval`` Executes the given JS or JSON code")
   .addField("Set Game", "``nb/setgame {Status} {Game}`` Sets the bots Playing status ``Status must be Playing, Watching or Listening``")
   .addField("Set Status", "``nb/setstatus`` Sets the bots Online status ``Status must be Idle, Online, Away or DND``")
   .addField("GEO IP Lookup", "``nb/geoip {IPHere}`` Checks and returns info on the given IP Address")
   .addField("Shut Down", "``nb/shutdown`` Shuts down the bot ``Restarts if Database hosted``")
   .setFooter(`© Ninja Bot v1.00`);   
   message.channel.send(hEmbed)
 }
