const {
    MessageEmbed,
    Message
} = require("discord.js")
const config = require("../config.json")
const ms = require("ms")

module.exports = {
    name: "vouch",
    description: "Posts a new vouch to the vouch channel.",
    args: true,
    type: "member",
    cooldown: config.general.vouchCooldown,
    usage: "<starsAmount> <review>",
    execute(message, args, client) {
        if (message.member.roles.cache.find(r => r.id === config.general.vipRoleId)) {
            var starsAmount = args[0]
            var valid = ["1", "2", "3", "4", "5"]
            if (valid.includes(starsAmount)) {
                if (args.slice(1).length) {
                    message.delete()
                    var review = args.slice(1).join(" ")
                    var reviewChannel = message.guild.channels.cache.find(c => c.id === config.general.reviewChannelId)
                    var reviewEmbed = new MessageEmbed()
                        .setColor(config.embeds.embedNeutralColor)
                        .setTitle(config.embeds.reviewEmbed.title)
                        .setFooter(config.embeds.embedFooter)
                        .setTimestamp()
                    switch (starsAmount) {
                        case "1":
                            reviewEmbed.setDescription(config.embeds.reviewEmbed.text.replace("%stars%", ":star:").replace("%review%", review).replace("%user%", message.author))
                            reviewChannel.send(reviewEmbed)
                            break;
                        case "2":
                            reviewEmbed.setDescription(config.embeds.reviewEmbed.text.replace("%stars%", ":star: :star:").replace("%review%", review).replace("%user%", message.author))
                            reviewChannel.send(reviewEmbed)
                            break;
                        case "3":
                            reviewEmbed.setDescription(config.embeds.reviewEmbed.text.replace("%stars%", ":star: :star: :star:").replace("%review%", review).replace("%user%", message.author))
                            reviewChannel.send(reviewEmbed)
                            break;
                        case "4":
                            reviewEmbed.setDescription(config.embeds.reviewEmbed.text.replace("%stars%", ":star: :star: :star: :star:").replace("%review%", review).replace("%user%", message.author))
                            reviewChannel.send(reviewEmbed)
                            break;
                        case "5":
                            reviewEmbed.setDescription(config.embeds.reviewEmbed.text.replace("%stars%", ":star: :star: :star: :star: :star:").replace("%review%", review).replace("%user%", message.author))
                            reviewChannel.send(reviewEmbed)
                            break;
                    }
                } else {
                    var errorEmbed = new MessageEmbed()
                        .setColor(config.embeds.embedErrorColor)
                        .setFooter(config.embeds.embedFooter)
                        .setTimestamp()
                        .setTitle(config.embeds.noReviewText.title)
                        .setDescription(config.embeds.noReviewText.text)
                    return message.channel.send(errorEmbed)
                }
            } else {
                var errorEmbed2 = new MessageEmbed()
                    .setColor(config.embeds.embedErrorColor)
                    .setFooter(config.embeds.embedFooter)
                    .setTimestamp()
                    .setTitle(config.embeds.invalidStarsAmount.title)
                    .setDescription(config.embeds.invalidStarsAmount.text)
                return message.channel.send(errorEmbed2)
            }
        } else {
            var errorEmbed3 = new MessageEmbed()
                .setColor(config.embeds.embedErrorColor)
                .setFooter(config.embeds.embedFooter)
                .setTimestamp()
                .setTitle(config.embeds.notVipError.title)
                .setDescription(config.embeds.notVipError.text)
            return message.channel.send(errorEmbed3)
        }
    }
}