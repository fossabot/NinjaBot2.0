const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const owners = require ("../data/config.json");

exports.run = async (client, message, args) => {
	
	  message.delete().catch();
  var list = client.guilds.array().sort();
  let botembed = new Discord.RichEmbed()
  .setTitle("Ninja Bot Server List")
  .setDescription(list)
  .setColor("0x0ffff")
  message.channel.send(botembed);

}