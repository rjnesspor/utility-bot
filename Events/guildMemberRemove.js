const { MessageEmbed, Message } = require("discord.js")
const config = require("../config.json")

module.exports = {
    name: 'guildMemberRemove',
    execute(member, client) {
        const welcomeChannel = member.guild.channels.cache.find(c => c.id === config.general.welcomeMsgChannelId)
        const leaveEmbed = new MessageEmbed()
        .setColor(config.embeds.embedNeutralColor)
        .setTitle(config.embeds.leaveMessageEmbed.title)
        .setDescription(config.embeds.leaveMessageEmbed.text.replace("%user%", member.user))
        .setTimestamp()
        welcomeChannel.send(leaveEmbed)

    }
}