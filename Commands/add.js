const {
    MessageEmbed,
    Message
} = require("discord.js")
const config = require("../config.json")
const ms = require("ms")

module.exports = {
    name: "add",
    description: "Adds a user to a ticket.",
    args: true,
    type: "staff",
    usage: "<@user> <#ticket>",
    async execute(message, args, client) {
        if (message.mentions.members.first()) {
            var user = message.mentions.members.first()
            if (message.mentions.channels.first()) {
                var channel = message.mentions.channels.first()
                channel.createOverwrite(user.user, {
                    VIEW_CHANNEL: true
                })
                var successEmbed = new MessageEmbed()
                    .setColor(config.embeds.embedSuccessColor)
                    .setFooter(config.embeds.embedFooter)
                    .setTimestamp()
                    .setTitle(config.embeds.successAdd.title)
                    .setDescription(config.embeds.successAdd.text.replace("%user%", user.user).replace("%ticket%", channel))
                var x = await message.channel.send(successEmbed)
                setTimeout(() => {
                    x.delete()
                    message.delete()
                }, ms(config.general.commandDeleteTimer));
            } else {
                var errorEmbed = new MessageEmbed()
                    .setColor(config.embeds.embedErrorColor)
                    .setFooter(config.embeds.embedFooter)
                    .setTimestamp()
                    .setTitle(config.embeds.errorNoChannel.title)
                    .setDescription(config.embeds.errorNoChannel.text)
                var xy = await message.channel.send(errorEmbed)
                setTimeout(() => {
                    message.delete()
                    xy.delete()
                }, ms(config.general.commandDeleteTimer));
            }
        } else {
            var errorEmbed2 = new MessageEmbed()
                .setColor(config.embeds.embedErrorColor)
                .setFooter(config.embeds.embedFooter)
                .setTimestamp()
                .setTitle(config.embeds.errorNoUser.title)
                .setDescription(config.embeds.errorNoUser.text)
            var xyz = await message.channel.send(errorEmbed2)
            setTimeout(() => {
                message.delete()
                xyz.delete()
            }, ms(config.general.commandDeleteTimer));

        }
    }
}