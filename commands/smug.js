const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../data/customisation.json');

exports.run = async (client, message, args, tools) => {
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/smug");
    
    const embed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setImage(body.url) 
    .setFooter(`© Ninja Bot v1.00`);
    message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'smug',
    description: 'Smugs xD',
    usage: 'smug'
  };