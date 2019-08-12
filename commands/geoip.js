//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require('discord.js');

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = (client, message, args) => {
	
//This is your Command or Discord Rich Embed code Line followed by the end of the command. OR close "}" bracket
//This command is very dangerous and should be used at your own risk. (Locked to bot owner by default)
//If self hosting unlock this command at your own risk your account could be banned or terminated.
if(message.author.id !== config.ownerID) return message.channel.send("You cannot use this command it is **BOTOWNER** only!")
      snekfetch.get(`http://ip-api.com/json/${args}`).then (r => {
        message.delete().catch();

        let Geo = new Discord.RichEmbed()
        .setColor("#0x3dfbff")
        .setTimestamp()
        .setTitle(`IP Lookup`)
        .setDescription(`**__GeoIP Lookup Information__**
      **Looked Up IP**: ||${args}||
      **Status**: ${r.body.status}
      **ISP**: ${r.body.isp}
      **Orginization Name**: ${r.body.org}
      **AS**: ${r.body.as}
      **ASN**: ${r.body.as}
      **Country**: ${r.body.country}
      **City**: ${r.body.city}
      **Lat**: ${r.body.lat}
      **Lon**: ${r.body.lon}
      **Reverse DNS**: ${r.body.reverse}
      **TimeZone**: ${r.body.timezone}
      **Region**: ${r.body.region}
      **Zip**: ${r.body.zip}
      **Whatever tf this is**: ${r.body.user_agent}
      **Is Mobile**: ${r.body.mobile}
      **Proxy**: ${r.body.proxy}`)
          .setFooter(`Resolved By: ${message.author.tag}`);
          message.channel.send({embed: Geo});
      })
    }
