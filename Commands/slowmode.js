const { MessageEmbed, Message } = require("discord.js")
const config = require("../config.json")
const {MessageButton, MessageActionRow} = require('discord-buttons')
const ms = require("ms")

module.exports = {
    name: "slowmode",
    description: "Enables slowmode in your channel.",
    args: true,
    type: "staff",
    usage: "<time>",
    execute(message, args, client) {
        if (!isNaN(args[0])) {
            message.channel.setRateLimitPerUser(args[0])
            const success = new MessageEmbed()
            .setColor(config.embeds.embedSuccessColor)
            .setFooter(config.embeds.embedFooter)
            .setTimestamp()
            .setTitle(config.embeds.slowmodeSuccess.title)
            .setDescription(config.embeds.slowmodeSuccess.text.replace("%time%", args[0]))
            message.channel.send(success)
        }
    }
}