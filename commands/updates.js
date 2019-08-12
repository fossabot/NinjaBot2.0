const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const fs = require("fs");
const owners = require ('../data/config.json');

exports.run = async (client, message, args) => {
	
		let embed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Permissions Error")
    .setDescription("You scrub, what made you think you\'d be able to do that??'")
	.addField("Permissions Required", "***BOT OWNER***")
    .setFooter("© Ninja Bot v1.00")	
	
  if (message.author.id !== '444609097233465347') return message.channel.send(embed);

let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));   
    const Message = args.join(" ");
    let sicon = message.guild.iconURL;
    message.delete().catch();

    if(!args[0] || args[0 == "help"]) return message.reply("Usage: nb/sendembed <Embed Title> <Embed message>");
  let embedMessage = new Discord.RichEmbed()
  
  .setTitle("Ninja Bot Updates")
  .setDescription(Message)
  .setThumbnail(sicon)
  .setColor("#0x3dfbff")
    
  message.channel.send(embedMessage);
  }
