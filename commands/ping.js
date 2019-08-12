const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  let ping = client.ping;

  let Pembed2 = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setDescription("Pong :ping_pong: Time Taken Is " + client.ping + "ms!");
      message.delete().catch();


  message.channel.send(Pembed2);
};
