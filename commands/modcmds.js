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
   .setTitle("Ninja Bot Moderator Commands")
   .setDescription(`<@${message.author.id}>` + "Below is a list of my commands and their usage.")
   .setColor("#0x3dfbff")
   .addBlankField()
   .addField("Required", "``{}`` -> Required Field")
   .addField("Not Required", "``[]`` -> Not Required Field")
   .addBlankField()
   .addField("Ban A Member", "``nb/ban {@user} [reason]`` Permanently bans the mentioned user from the current server")
   .addField("Mute A Member", "``nb/mute {@user} [reason]`` Mutes the mentioned user")
   .addField("Temp Mute A Member", "``nb/tempmute {@user} {time}`` Temporarially mutes the mentioned user for the amount of time given")
   .addField("Soft Ban A Member", "``nb/softban {@user} [reason]`` Temporarially bans the mentioned user from the server")
   .addField("Kick A Member", "``nb/kick {@user} [reason]`` Kicks the mentioned user from the server") 
   .addField("Add Role", "``nb/addrole {@user} {role}`` Adds a role to the mentioned user")
   .addField("Remove Role", "``nb/removerole {@user} {role}`` Removes a role from the mentioned user")
   .addField("Rename", "``nb/rename {@user} {newname}`` Changes the users name to the name given")
   .addField("Timed Lockdown", "``nb/timedlockdown {time}`` Locks the current channel for the amount of time given")
   .addField("UnLockdown", "``nb/unlockdown`` Removes the LockDown on the current channel")
   .addField("Warn", "``nb/warn {@user} {reason}`` Warns the mentioned user for the reason given")
   .addField("Warn Level", "``nb/warnlevel {@user}`` Shows how many warnings the mentioned user has")
   .addField("Clear Member Warnings", "``nb/clearwarns {user}")
   .setFooter(`© Ninja Bot v1.00`);   
   message.channel.send(hEmbed)
 }
