const Discord = require('discord.js');
const customisation = require('../data/customisation.json');

exports.run = async (client, message, args) => {
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL : message.author.avatarURL;
    
    const embed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setImage(`https://api.alexflipnote.dev/jokeoverhead?image=` + avatar) 
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
    name: 'woosh',
    description: 'r/woosh',
    usage: 'woosh (w or w/o @mention)'
  };
   