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

let reportEmbed2 = new Discord.RichEmbed()
     .setTitle("Report Help")
     .setDescription("How to report a member :thinking:")
     .setColor("#0x3dfbff")
     .addField("Command Usage", "``nb/report``")
     .addField("Usage Example", "``nb/report @User#123``")

  if(!args[0] || args[0 == "help"]) return message.channel.send(reportEmbed2);
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!rUser) return message.channel.send("Couldn't find the mentioned user");
     let reason = args.join(" ").slice(22);

     let reportEmbed = new Discord.RichEmbed()
     .setDescription("Reports")
     .setColor("#0x3dfbff")
     .addField("Reported User", `${rUser} with ID ${rUser.id }`)
     .addField("Reported by", `${message.author} with ID ${message.author.id}`)
     .addField("Channel", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", reason)

     let reportChannel = message.guild.channels.find("name", "reports");
     if(!reportChannel) return message.channel.send(`<@${message.author.id}> Couldn't find the reports channel`);

     message.delete().catch(O_o=>{});
     reportChannel.send(reportEmbed);
  } 