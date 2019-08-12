const childProcess = require('child_process');

exports.run = (client, message, args, data, errors) => {
	
	let embed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Permissions Error")
    .setDescription("You scrub, what made you think you\'d be able to do that??'")
	.addField("Permissions Required", "***BOT OWNER***")
    .setFooter("© Ninja Bot v1.00")	  
	
//This is your command code	
  if (message.author.id !== "444609097233465347")
  return message.channel.send(embed);
    childProcess.exec(args.join(' '), {},
        (err, stdout, stderr) => {
            if (err) return message.channel.sendCode('', err.message);
            message.channel.sendCode('', stdout);
        });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'exec',
  description: 'Executes a process command.',
  usage: 'exec'
};
