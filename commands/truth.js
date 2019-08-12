const Discord = require('discord.js');
const customisation = require('../data/customisation.json');

exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply('Provide a truth!')
    const embed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setImage(`https://api.alexflipnote.dev/scroll?text=` + args.join('%20')) 
    .setFooter(`© Ninja Bot v1.00`);
    message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'truth',
    description: 'Sends a scroll truth',
    usage: 'truth (truth)'
  };
   
