
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone : true,
  fetchAllMembers : true
});
 
const config = require("./config.json");
const fs = require("fs");
const snekfetch = require('snekfetch');


client.on("ready",  async () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setGame(`nb/help`, `https://www.twitch.tv/monstercat`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`nb/help`, `https://www.twitch.tv/monstercat`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`nb/help`, `https://www.twitch.tv/monstercat`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if(command === "ticketclose") {
  message.delete().catch();	  
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);

    message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`-confirm\`. This will time out in 10 seconds and be cancelled.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '-confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });

  }

  if(command === "ticketcreate") {
    const reason = message.content.split(" ").slice(1).join(" ");
    let nEmbed = new Discord.RichEmbed()
    .setTitle("Support category not found")
    .setColor(0xCF40FA)
    .setDescription("**There wasn't a tickets category so i created one! Please execute the command again to open your ticket**");
     message.delete().catch();
    if (!message.guild.channels.exists("name", "tickets", "category")) return message.channel.send(nEmbed) .then(message.guild.createChannel("tickets", "category"));

    if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
    message.guild.createChannel(`ticket-${message.author.id}`, "text",).then(c => {
        let role = message.guild.roles.find("name", "Support Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        let category = message.guild.channels.find(c => c.name == "tickets" && c.type == "category");
        c.setParent(category);
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hey ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Team** will be here soon to help.`)
        .addField(`Reason`, `${reason}`)
        .setTimestamp()
        c.send({ embed: embed });
    }).catch(console.error);
  }

  if(command === "ping") {
  message.delete().catch();	  
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
	
if(command === "invite") {
  message.delete().catch();	
   let iEmbed = new Discord.RichEmbed()
   .setTitle("Invite Ninja Bot")
   .setColor("0xff80ff")
   .addField("Invite Link", "[Invite Me Here](https://discordapp.com/api/oauth2/authorize?client_id=595155471611068426&permissions=2146958839&scope=bot)")
   message.channel.send(iEmbed)
 }	
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
  message.delete().catch();	  
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

	if (message.content.toLowerCase().startsWith(config.prefix + `remove`)) {
  message.delete().catch();		
    if (!message.channel.name.startsWith(`ticket-`)) {
    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .addField(`Whoops That's Not Right`, `You can't use this command outside of a ticket channel.`)
    message.channel.send({ embed: embed });
    return
    }
    removedmember = message.mentions.members.first();
    message.channel.overwritePermissions(removedmember, { SEND_MESSAGES : false, VIEW_CHANNEL : false});
    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .addField('**' + removedmember + '** has been removed from the ticket.')
    message.channel.send({ embed: embed });
  }

if (message.content.toLowerCase().startsWith(config.prefix + `add`)) {
  message.delete().catch();	
    if (!message.channel.name.startsWith(`ticket-`)) {
    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .addField(`Whoops That's Not Right`, `You can't use this command outside of a ticket channel.`)
    message.channel.send({ embed: embed });
    return
    }
    addedmember = message.mentions.members.first();
    message.channel.overwritePermissions(addedmember, { SEND_MESSAGES : true, VIEW_CHANNEL : true});
    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .addField('**' + addedmember + `** has been added to the ticket. Remove with [${config.prefix}remove]`)
    message.channel.send({ embed: embed });

  }
  
  if(command === "ban") {
  message.delete().catch();	  
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
  message.delete().catch();	  
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
 if(command === "help") {
  message.delete().catch();	 
   let hEmbed = new Discord.RichEmbed()
   .setTitle("Ninja Bot Commands")
   .setColor("0xff80ff")
   .addField("Kick", "Kicks the mentioned user **nb/kick @user**")
   .addField("Ban", "Bans mentioned user **nb/ban @user <reason>**")
   .addField("Serverlist", "Shows a list of guilds the bots in")
   .addField("About", "Shows info about the bot")
   .addField("Report", "Reports mentioned user for supplied reason **nb/report @user <reason>**")
   .addField("Sendembed", "Send an embeded message **nb/sendembed test**")
   .addField("suggest", "Sends your suggestion to the placeholder support server **nb/suggest <suggestion>**")
   .addField("Removerole", "Removes the mentioned role from the mentioned user **nb/removerole @user @rolename**")
   .addField("Say", "Sends your provided message **nb/say <message>**")
   .addField("Purge", "Deletes the provided number of messages **nb/purge <number of messages>**")
   .addField("ticketcreate", "Opens a new support ticket **nb/new <reason>**")
   .addField("ticketclose", "Closes a support ticket **nb/close <#ticketchannel>**  note you have to send this command inside of the ticket channel")
   message.channel.send(hEmbed)
 }

if(command === "foo") {
    message.delete().catch();
    // Defines Foo From Bar
    const m = await message.channel.send("foo?");
    m.edit(`FOO BAR BITCH`);
}

if(command === "about") {
   message.delete().catch();
   let aEmbed = new Discord.RichEmbed()
   .setTitle("About Ninja Bot")
   .setColor("0xff80ff")
   .addField("Version", "Beta v1.00")
   .addField("Author", "ツ 𝕿𝖞𝖑𝖊𝖗. 𝕳 ツ#9393")
   .addField("Ninja Bot Support", "[Support Server](https://discord.gg/BkGDvwa)")
   message.channel.send(aEmbed)
 }
 
if(command === "serverlist") {
  message.delete().catch();
  var list = client.guilds.array().sort();
  let botembed = new Discord.RichEmbed()
  .setTitle(list)
  .setColor("#0x3dfbff")
  message.channel.send(botembed);

}

 if(command === "report") {
  message.delete().catch();
  if(!args[0] || args[0 == "help"]) return message.reply("Usage: nb/report <What you want to report>");
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!rUser) return message.channel.send("Couldn't find the mentioned user");
     let reason = args.join(" ").slice(22);

     let reportEmbed = new Discord.RichEmbed()
     .setDescription("Reports")
     .setColor("0xff80ff")
     .addField("Reported User", `${rUser} with ID ${rUser.id }`)
     .addField("Reported by", `${message.author} with ID ${message.author.id}`)
     .addField("Channel", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", reason)

     let reportChannel = message.guild.channels.find("name", "reports");
     if(!reportChannel) return message.channel.send(`<@${message.author.id}> Couldn't find the reports channel`);

     message.delete().catch(O_o=>{});
     reportChannel.send(reportEmbed);
  } 
  if(command === "sendembed") {
     
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));    
    const Message = args.join(" ");
    let sicon = message.guild.iconURL;
    message.delete().catch();

    if(!args[0] || args[0 == "help"]) return message.reply("Usage: nb/sendembed <Embed message>");
  let embedMessage = new Discord.RichEmbed()
  
  .setDescription(Message)
  .setThumbnail(sicon)
  .setColor("0xff80ff")
    
  message.channel.send(embedMessage);
  }
  if(command === "suggest") {
    const sayMessage = args.join(" ");
    message.delete().catch();


    let sEmbed = new Discord.RichEmbed()
    .setTitle("Suggestion")
    .setColor("0xff80ff")
    .addField("User", message.author)
    .addField("UserID", `${message.author.id}`)
    .addField("Server", `${message.channel.guild}`)
    .addField("Suggested", `${sayMessage}`)



client.guilds.find("id","585650653301440552").channels.find("name","suggestions").send(sEmbed);
message.reply("Suggestion has been sent");
console.log(`<@${message.author.id}> has used the suggest command in ${message.channel.guild} channel ${message.channel}`)
  }
  if(command === "roleremove") {
    message.delete().catch();
    if(!args[0] || args[0 == "help"]) return message.reply("Usage: nb/removerole <@user> **rolename** ");
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry you dont have the permission to use this commands");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("Couldn't find that user");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("Specify a role boi");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Couldn't find that role.");
  
    if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
    await(rMember.removeRole(gRole.id));
  
    try{
      await rMember.send(`RIP, you lost the ${gRole.name} role.`)
    }catch(e){
      message.channel.send(`RIP to <@${rMember.id}>, We removed ${gRole.name} from them.`)
  }
}
if(command === "rr") {
    message.delete().catch();
    if(!args[0] || args[0 == "help"]) return message.reply("Usage: nb/removerole <@user> **rolename** ");
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry you dont have the permission to use this commands");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("Umm, i Couldn't find that user :shrug: try again make sure you @mention them");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("Please specify a role to remove");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Couldn't find that role.");
  
    if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
    await(rMember.removeRole(gRole.id));
  
    try{
      await rMember.send(`RIP, you lost the ${gRole.name} role.`)
    }catch(e){
      message.channel.send(`RIP to <@${rMember.id}>, We removed ${gRole.name} from them.`)
  }
}
    if(command === "geoip") {
      
    if(message.author.id !== config.ownerID) return message.channel.send("You cannot use this command it is **BOTOWNER** only!")
      snekfetch.get(`http://ip-api.com/json/${args}`).then (r => {
        message.delete().catch();

        let Geo = new Discord.RichEmbed()
        .setColor("0xff80ff")
        .setTimestamp()
        .setTitle(`GeoIP Lookup`)
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
    if(command === "serverinfo") {
      message.delete().catch();
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name} - Informations`, message.guild.iconURL)
    .setDescription("Server Information")
    .setColor("#0xff80ff")
    .setThumbnail(sicon)
    .addField("Server Owner", message.guild.owner, true)
    .addField("Server Name", message.guild.name, true)
    .addField('Server region', message.guild.region, true)
    .addField("Created On", message.guild.createdAt, true)
    .addField("You Joined", message.member.joinedAt, true)
    .addField('Channel count', message.guild.channels.size, true)
    .addField('Total member count', message.guild.memberCount)
    .addField('Verification level', message.guild.verificationLevel, true)
    .setFooter('Guild created at:')
    .setTimestamp(message.guild.createdAt);

    message.channel.send(serverembed);
    }
  });


client.login(config.token);
