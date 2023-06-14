const DiscordJS = require("discord.js")
Intents = DiscordJS.Intents


const Client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

Client.on("ready", () => {
  console.log("bot is ready")
})

Client.on('messageDelete', async function(message, channel){
    console.log(message.author)
    var attachments = []
    var x = []
    message.attachments.forEach((e) => {
      x.push(e)
    })
    message.stickers.forEach((e) => {
      const file = new DiscordJS.MessageAttachment(e.url,e.name)
      attachments.push(file)
    })
    for (const e of x){
      const file = new DiscordJS.MessageAttachment(e.url,e.name)
      attachments.push(file)
    }

    
    var embed = {"fields":[
    {"name":"details","value":`user id: ${message.author.id}\nchannel: <#${message.channel.id}>\n timestamp: ${message.createdAt}`,"inline":false}
    ],
    "title":`Message Deleted in #${message.channel.name}`,
    "description":`${message.author.tag}: ${message.content}`,
    "author":{"name":"message logging"},
    "color":16711680,"footer":{"text":"modUtils"}}

    const Channel = Client.channels.cache.get('935818459600801813');
    Channel.send({ embeds: [embed], files: attachments});
});

Client.on('messageUpdate', (oldmessage, newmessage) => {
  var oldattachments = []
  var newattachments = []
  var oldx =[]
  var newx = []
  oldmessage.attachments.forEach((e) => {
      oldx.push(e)
    })
  oldmessage.stickers.forEach((e) => {
      const file = new DiscordJS.MessageAttachment(e.url,e.name)
      oldattachments.push(file)
    })
    for (const e of oldx){
      const file = new DiscordJS.MessageAttachment(e.url,e.name)
      oldattachments.push(file)
    }

  newmessage.attachments.forEach((e) => {
      newx.push(e)
    })
  newmessage.stickers.forEach((e) => {
      const file = new DiscordJS.MessageAttachment(e.url,e.name)
      attachments.push(file)
    })
    for (const e of newx){
      const file = new DiscordJS.MessageAttachment(e.url,e.name)
      newattachments.push(file)
    }

    const e1 = {"title":`Message Edited in #${oldmessage.channel.name}`,"color":11390719}
    const e2 = {"fields":[{"name":"details","value":`user id: ${oldmessage.author.id}\nchannel: <#${oldmessage.channel.id}>\ntimestamp: ${oldmessage.createdAt}`,"inline":false}],"title":"old message:","description":`${oldmessage.author.tag}: ${oldmessage.content}`,"color":7755}
    const e3 = {"fields":[{"name":"details","value":`user id: ${newmessage.author.id}\nchannel: <#${newmessage.channel.id}>\ntimestamp: ${newmessage.createdAt}`,"inline":false}],"title":"new message:","description":`${newmessage.author.tag}: ${newmessage.content}`,"color":7755}
    const Channel = Client.channels.cache.get('935818459600801813');
    Channel.send({ embeds: [e1,e2,e3], attachments: [...oldattachments, ...newattachments]});
}) 

 

keepAlive();

Client.login(process.env.TOKEN)
