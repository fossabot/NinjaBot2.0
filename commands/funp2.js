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
   .setTitle("Ninja Bot Fun Commands Page 2")
   .setDescription(`<@${message.author.id}>` + "Below is a list of my commands and their usage.")
   .setColor("#0x3dfbff")
   .addBlankField()
   .addField("Required", "``{}`` -> Required Field")
   .addField("Not Required", "``[]`` -> Not Required Field")
   .addBlankField()
   .addField("Punch A Member", "``nb/8ball {@user}`` Punches the mentioned member")
   .addField("Roll The Dice", "``nb/roll`` Rolls a dice")
   .addField("Rock Paper Scissors", "``nb/rps`` Plays Rock Paper Scissors with the bot")
   .addField("Slap A Member", "``nb/slap {@user}`` Slaps the mentioned user")
   .addField("Smack A Member", "``nb/coinflip`` Responds with ``Heads`` or ``Tails``") 
   .addField("Smug Look", "``nb/smug`` Generates a random response")
   .addField("Spank A Member", "``nb/spank {@user} Spanks the mentioned member")
   .addField("Tickle A Member", "``nb/tickle {@user}`` Tickles the mentioned user")
   .addField("Woosh", "``nb/woosh`` WOOOSH!!!!")
   .setFooter(`© Ninja Bot v1.00`);   
   message.channel.send(hEmbed)
 }
