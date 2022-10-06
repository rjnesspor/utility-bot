const { prefix } = require('../config.json');
const { MessageEmbed } = require("discord.js")
const config = require('../config.json')

module.exports = {
    name: 'help',
    description: 'List of all commands or info about a specific command.',
    aliases: ['commands', 'cmds'],
    execute(message, args) {
        const { commands } = message.client;
        var staffCmds = [`**Staff Commands**\n`];
        var memberCmds = [`**Member Commands**\n`];
        commands.forEach(cmd => {
            if (cmd.type == 'member') {
                memberCmds.push(`\`${cmd.name}\``)
                staffCmds.push(`\`${cmd.name}\``)
            } else if (cmd.type == "staff") {
                staffCmds.push(`\`${cmd.name}\``)
            }
        })
        var embed = new MessageEmbed()
            .setColor(config.embeds.embedNeutralColor)
            .setTitle(config.embeds.helpEmbed.title)
            .setTimestamp()
            .setFooter(config.embeds.embedFooter)
        if (message.member.roles.cache.find(r => r.id === config.general.staffRoleId)) {
            embed.setDescription(config.embeds.helpEmbed.text.replace("%commands%", staffCmds.join("\n")))
            message.channel.send(embed)
        } else {
            embed.setDescription(config.embeds.helpEmbed.text.replace("%commands%", memberCmds.join("\n")))
            message.channel.send(embed)
        }
    },
};