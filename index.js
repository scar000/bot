const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./botconfig.json");



client.on("ready", async () =>{
    console.log(`${client.user.username}`)
    client.user.setActivity('online');

})

const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) return console.log("No commands found.")

    jsfile.forEach((f,i) => {
        let pull = require(`./commands/${f}`);
        client.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
        })
    })
});


client.on('guildMemberAdd', member => {
    console.log('User ' + member.user.username + ' has joined the server.');

    var role = member.guild.roles.find(role => role.name === 'gamer'); 
    member.addRole(role);
})

client.on("message", async message  => {
if(message.author.bot) return;
    if(message.channel.type === "dm") return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
    if(!message.content.startsWith(config.prefix)) return;
        let commandfile = bot.commands.get(cmd) || client.commands.get(bot.aliases.get(cmd))
            if(commandfile) commandfile.run(bot, message, args)
}); 

client.login(config.token);
