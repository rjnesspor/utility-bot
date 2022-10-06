const {
    MessageEmbed,
    Message
} = require("discord.js")
const config = require("../config.json")
const ms = require("ms")

module.exports = {
    name: "remove",
    description: "Removes a user from a ticket.",
    args: true,
    type: "staff",
    usage: "<@user> <#ticket>",
    execute(message, args, client) {
        if (message.mentions.members.first()) {
            var user = message.mentions.members.first()
            if (message.mentions.channels.first()) {
                var channel = message.mentions.channels.first()
                channel.createOverwrite(user.user, {
                    VIEW_CHANNEL: false
                })
                var successEmbed = new MessageEmbed()
                    .setColor(config.embeds.embedSuccessColor)
                    .setFooter(config.embeds.embedFooter)
                    .setTimestamp()
                    .setTitle(config.embeds.successRemove.title)
                    .setDescription(config.embeds.successRemove.text.replace("%user%", user.user).replace("%ticket%", channel))
                return message.channel.send(successEmbed)
            } else {
                var errorEmbed = new MessageEmbed()
                    .setColor(config.embeds.embedErrorColor)
                    .setFooter(config.embeds.embedFooter)
                    .setTimestamp()
                    .setTitle(config.embeds.errorNoChannel.title)
                    .setDescription(config.embeds.errorNoChannel.text)
                return message.channel.send(errorEmbed)
            }
        } else {
            var errorEmbed2 = new MessageEmbed()
                .setColor(config.embeds.embedErrorColor)
                .setFooter(config.embeds.embedFooter)
                .setTimestamp()
                .setTitle(config.embeds.errorNoUser.title)
                .setDescription(config.embeds.errorNoUser.text)
            return message.channel.send(errorEmbed2)
        }
    }
}