const Discord = require("discord.js");
const customisation = require('../data/customisation.json');
const client = new Discord.Client({

//This function allows the bot to respond to @mention for commands
//Here this code is only Executed for "prefix" but you will find this code in all the commands.

exports.run = async (bot, message, args) => {
    if(!args[2]) return message.reply("Please ask a full question");
    let replies = [
        'Maybe.',
	    'Certainly not.',
	    'I hope so.',
	    'Not in your wildest dreams.',
    	'There is a good chance.',
	    'Quite likely.',
    	'I think so.',
    	'I hope not.',
    	'I hope so.',
    	'Never!',
    	'Pfft.',
	    'Sorry, bucko.',
    	'Hell, yes.',
    	'Hell to the no.',
    	'The future is bleak.',
	    'The future is uncertain.',
	    'I would rather not say.',
    	'Who cares?',
    	'Possibly.',
    	'Never, ever, ever.',
    	'There is a small chance.',
    	'Yes!',
    	'lol no.',
    	'There is a high probability.',
    	'What difference does it makes?',
    	'Not my problem.',
        'Ask someone else.'
    ];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let embed = new Discord.RichEmbed()
    .setTitle("MAGIC 8 BALL!!!")
    .setColor("#AA9900")
    .addField("Q:", question)
    .addField("A:", replies[result])
    .setFooter(`© Ninja Bot v1.00`);

    message.channel.send({embed});
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: '8ball',
    description: 'Ask the bot a Question.',
    usage: '8ball (question)'
  };

