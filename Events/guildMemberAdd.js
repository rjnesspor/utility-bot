const { MessageEmbed, Message } = require("discord.js")
const config = require("../config.json")

module.exports = {
    name: 'guildMemberAdd',
    execute(member, client) {
        const welcomeChannel = member.guild.channels.cache.find(c => c.id === config.general.welcomeMsgChannelId)
        const role1 = member.guild.roles.cache.find(r => r.id === config.general.joinRoleId)
        const welcomeEmbed = new MessageEmbed()
        .setColor(config.embeds.embedNeutralColor)
        .setTitle(config.embeds.joinMessageEmbed.title)
        .setDescription(config.embeds.joinMessageEmbed.text.replace("%user%", member.user))
        .setTimestamp()
        welcomeChannel.send(welcomeEmbed)
        member.roles.add(role1)

    }
}