//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone : true,
  fetchAllMembers : true
});
 
const config = require("../data/config.json");
const fs = require("fs");
const snekfetch = require('snekfetch');
const owner = config.ownerID

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = async (client, message, args) => {

//This is your Command or Discord Rich Embed code Line followed by the end of the command. OR close "}" bracket	
let owner = client.users.get('444609097233465347');
   message.delete().catch();
   let aEmbed = new Discord.RichEmbed()
   .setTitle("About Ninja Bot")
   .setDescription("Ninja Bot is a bot created in the ``Discord.js`` library with mostly moderation in mind")
   .setColor("#0x3dfbff")
   .addField("Current Version", "``v1.00``")
   .addField("Author", `Created By: ${owner}`)
   .addField("Ninja Bot Support", "[Support Server](https://discord.gg/yFmtAUM)")
   message.channel.send(aEmbed).then(sentMessage => {
	sentMessage.react('👍');

 const filter = (reaction, user) => {
	return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
};

message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '👍') {
			message.reply('you reacted with a thumbs up.');
		} 
 

 });
}
