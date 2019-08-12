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
   .addField("8Ball Game", "``nb/8ball {Question}`` Generates a answer to the question given")
   .addField("Advice", "``nb/advice`` Sends random life advice")
   .addField("Avatar", "``nb/avatar {@user}`` Displays the mentioned users avatar")
   .addField("Cat Pic", "``nb/cat`` Generates a random picture of a cat")
   .addField("Coin Flip", "``nb/coinflip`` Responds with ``Heads`` or ``Tails``") 
   .addField("Color Search", "``nb/colorsearch {HEX Code}`` Responds with the color for the hex code provided")
   .addField("Currency", "``nb/currency <amount> [Base currency] [Target currency]`` Converts currency")
   .addField("Dad Joke", "``nb/dadjoke`` Sends a Horible dad joke that makes you cringe.")
   .addField("Dog Pic", "``nb/dog`` Responds with a random picture of a dog")
   .addField("Fight A Member", "``nb/fight {@User}`` Starts a fight with the member you mentioned")
   .addField("Gaming Memes", "``nb/gmemes`` Responds with a random Gaming based meme")
   .addField("New Life", "``nb/newlife`` Generates random life based responses")
   .addField("Poke A Member", "``nb/poke {user}`` Pokes the mentioned member")
   .setFooter(`Next Page: nb/funp2`);   
   message.channel.send(hEmbed)
 }
