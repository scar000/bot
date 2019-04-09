const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("oof");
    if(!args[0]) return message.channel.send("ooooof");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Apaguei ${args[0]} cenas.`).then(msg => msg.delete(5000));
    }); 
}

module.exports.config = {
    name: "clear",
    aliases: [""]
}