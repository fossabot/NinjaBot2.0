const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../data/customisation.json');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to spank them");
    if(message.mentions.users.first().id === "444609097233465347") return message.reply('You can\'t spank my Dev you pleblord.:facepalm: He will spank your ass off XDD');
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/spank");
    
    const embed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle(`${message.author.username} Spanked ${message.mentions.users.first().username} xDD`)
    .setImage(body.neko) 
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
    name: 'spank',
    description: 'Spanks someone xD',
    usage: 'spank'
  };