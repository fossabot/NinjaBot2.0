//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone : true,
  fetchAllMembers : true
});
 
const config = require("../data/memes.json");
const fs = require("fs");
const snekfetch = require('snekfetch');

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = async (client, message, args) => {
	
//This is a function used to auto delete messages which contain command executions	
  message.delete().catch();
  
//  let memes = ["https://i.imgur.com/p6yqUEh.jpg", "https://i.imgur.com/TNBHYor.mp4", "https://i.imgur.com/w26cAjn.jpg", "https://i.imgur.com/uiHXKad.jpg", "https://i.imgur.com/jnflrUo.jpg", "https://i.imgur.com/rE1mRAQ.jpg", "https://i.imgur.com/nTFQhvo.mp4", "https://i.imgur.com/KZrL3mr.png", "https://i.imgur.com/9nU228T.jpg", "https://i.imgur.com/zD1VQyt.jpg"];
//This line ^^ Is outdated and was removed after the end of Ninja Bot's beta stages. The links to the memes are now found and executed from the folder listed above (../data/memes.json)  
   let result = Math.floor((Math.random() * memes.length));
   
    let aEmbed2 = new Discord.RichEmbed()
   
   .setColor("#0x3dfbff")
   .setTitle("Gaming Memes :laughing:") 
   .setImage(memes[result]);
   message.channel.send(aEmbed2)
 }