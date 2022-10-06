const {
    MessageEmbed,
    Message
} = require("discord.js")
const config = require("../config.json")
const {
    MessageButton,
    MessageActionRow
} = require('discord-buttons')
const ms = require("ms")

module.exports = {
    name: "mute",
    description: "Mutes the desired user.",
    args: true,
    type: 'staff',
    usage: "<user> [time]",
    async execute(message, args, client) {
        const mutedRole = message.guild.roles.cache.find(r => r.id === config.general.mutedRoleId)
        var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const currentRoles = user.roles.cache
        if (!user) {
            const noUser = new MessageEmbed()
                .setColor(config.embeds.embedErrorColor)
                .setTitle(config.embeds.noUserEmbed.title)
                .setDescription(config.embeds.noUserEmbed.text)
                .setTimestamp();
            message.channel.send(noUser);
            return;
        }
        if (!user.roles.cache.some(r => r.id === config.general.mutedRoleId)) {
            if (args[1]) {
                if (ms(args[1])) {
                    var time = ms(args[1])
                    await user.roles.set([])
                    await user.roles.add(mutedRole)
                    const muteSuccessTime = new MessageEmbed()
                        .setColor(config.embeds.embedSuccessColor)
                        .setTimestamp()
                        .setFooter(config.embeds.embedFooter)
                        .setTitle(config.embeds.muteSuccessTimed.title)
                        .setDescription(config.embeds.muteSuccessTimed.text.replace("%user%", user.user).replace("%time%", ms(time, {
                            long: true
                        })))
                    message.channel.send(muteSuccessTime)
                    setTimeout(() => {
                        user.roles.remove(mutedRole)
                        user.roles.add(currentRoles)
                    }, time);
                }
            } else {
                await user.roles.add(mutedRole)
                const muteSuccess = new MessageEmbed()
                    .setColor(config.embeds.embedSuccessColor)
                    .setTimestamp()
                    .setFooter(config.embeds.embedFooter)
                    .setTitle(config.embeds.muteSuccessIndefinite.title)
                    .setDescription(config.embeds.muteSuccessIndefinite.text.replace("%user%", user.user))
                message.channel.send(muteSuccess)
            }
        } else {
            const alreadyMuted = new MessageEmbed()
                .setColor(config.embeds.embedErrorColor)
                .setTimestamp()
                .setFooter(config.embeds.embedFooter)
                .setTitle(config.embeds.alreadyMuted.title)
                .setDescription(config.embeds.alreadyMuted.text)
            return message.channel.send(alreadyMuted)
        }
    }
}