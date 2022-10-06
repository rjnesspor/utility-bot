const { MessageEmbed, Message } = require("discord.js")
const config = require("../config.json")
const { MessageButton, MessageActionRow } = require('discord-buttons')
const ms = require("ms")

module.exports = {
    name: "unmute",
    description: "Unmutes the desired user.",
    args: true,
    type: "staff",
    usage: "<user>",
    async execute(message, args, client) {
        const mutedRole = message.guild.roles.cache.find(r => r.id === config.general.mutedRoleId)
        var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) {
            const noUser = new MessageEmbed()
                .setColor(config.embeds.embedErrorColor)
                .setTitle(config.embeds.noUserEmbed.title)
                .setDescription(config.embeds.noUserEmbed.text)
                .setTimestamp();
            message.channel.send(noUser);
            return;
        }
        if (user.roles.cache.some(r => r.id === config.general.mutedRoleId)) {
            await user.roles.remove(mutedRole)
            const unmuteSuccess = new MessageEmbed()
                .setColor(config.embeds.embedSuccessColor)
                .setTimestamp()
                .setFooter(config.embeds.embedFooter)
                .setTitle(config.embeds.unmuteSuccess.title)
                .setDescription(config.embeds.unmuteSuccess.text.replace("%user%", user.user))
            message.channel.send(unmuteSuccess)
        } else {
            const notMuted = new MessageEmbed()
                .setColor(config.embeds.embedErrorColor)
                .setTimestamp()
                .setFooter(config.embeds.embedFooter)
                .setTitle(config.embeds.notMuted.title)
                .setDescription(config.embeds.notMuted.text)
            return message.channel.send(notMuted)
        }
    }
}