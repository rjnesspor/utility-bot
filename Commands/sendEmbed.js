const { MessageEmbed, Message } = require("discord.js")
const config = require("../config.json")
const ms = require("ms")

module.exports = {
    name: "embed",
    description: "Sends an embed message.",
    args: true,
    type: 'staff',
    usage: "<title> | <text> | <color> | <footer>",
    execute(message, args, client) {
        // ?embed title | text | color | footer
            var split = args.join(" ").split(" | ")
            var title = split[0]
            var text = split[1]
            var color = split[2]
            var footer = split[3]
            var test = /^#([0-9A-F]{3}){1,2}$/i
            if (test.test(color)) {
                var embed = new MessageEmbed()
                .setColor(color)
                .setFooter(footer)
                .setTitle(title)
                .setDescription(text)
                message.channel.send(embed)
                message.delete()
            } else {
                var error = new MessageEmbed()
                .setColor(config.embeds.embedErrorColor)
                .setDescription(config.embeds.invalidColorError.text)
                .setTitle(config.embeds.invalidColorError.title)
                .setTimestamp()
                return message.channel.send(error)
            }
    }
}