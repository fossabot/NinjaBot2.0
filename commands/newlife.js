//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const life = require('../data/life.json');
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
    let result = Math.floor((Math.random() * life.length));
   
    let aEmbed = new Discord.RichEmbed()
   
   .setColor("#0x3dfbff")
   .setTitle("Here Is Your New Life LOSER! :stuck_out_tongue:") 
   .setDescription(life[result]);
   message.channel.send(aEmbed)
 }
