//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone : true,
  fetchAllMembers : true
});
 
const config = require("../data/config.json");
const fs = require("fs");
const snekfetch = require('snekfetch');

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = async (client, message, args) => {
 
//This is your Command or Discord Rich Embed code Line followed by the end of the command. OR close "}" bracket
message.delete().catch();
        let messagecount = parseInt(args[1]) || 1;

        const deletedMessages = -1;

        message.channel.fetchMessages({limit: Math.min(messagecount + 1, 1000)}).then(messages => {
            messages.forEach(m => {
                if (message.author.id == client.user.id) {
                    message.delete().catch(console.error);
                    deletedMessages++;
                }

        }).then(() => {
                if (!deletedMessages === -1) deletedMessages= 0;
                return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

                if (deletedMessages === -1) deletedMessages = 0;
                message.channel.send(`:white_check_mark: Purged \`${deletedMessages}\` messages.`)
                    .then(m => m.delete(2000));
        }).catch(console.error);
    }
	  
