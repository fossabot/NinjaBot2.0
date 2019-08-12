const Discord = require('discord.js');

exports.run = (client, message) => {
    var milliseconds = parseInt((client.uptime % 1000) / 100),
        seconds = parseInt((client.uptime / 1000) % 60),
        minutes = parseInt((client.uptime / (1000 * 60)) % 24),
        hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24),
        days = parseInt((client.uptime / (1000 * 60 * 60 * 60)) % 360);

        days = (days < 10) ? "0" + "0" + days : days; 
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

   let Uembed = new Discord.RichEmbed()
      .setTimestamp()
      .setTitle(":clock1: Ninja Gen Uptime :clock1:")
      .setDescription("I have been online for")
      .setThumbnail(`https://i.imgur.com/xerUkNI.png`)
      .setColor(53380)
      .addField("Days", "** " + days + " **")
      .addBlankField()
      .addField("Hours", "** " + hours + " **")
      .addBlankField()
      .addField("Minutes", "**" + minutes + " **")
      .addBlankField()
      .addField("Seconds", "**" + seconds + "." + milliseconds + " **")
      .addBlankField()
      .setFooter(`Last Uptime Check`);
        message.delete().catch();
        message.channel.send(Uembed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'uptime',
  description: 'Shows how long the bot has been online for.',
  usage: 'uptime, ut, upt'
};
