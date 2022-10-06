const {
    Message,
    MessageEmbed
} = require("discord.js")
const config = require("../config.json")

module.exports = {
    name: 'clickButton',
    async execute(button, client) {
        if (button.id == "verify") {
            await button.clicker.fetch()
            const member = button.clicker.member
            member.roles.set([config.general.verifiedRoleId])
            await button.defer()
        } else if (button.id == "ticket") {
            await button.clicker.fetch()
            await button.defer()
            const user = button.clicker.user
            button.guild.channels.create(`${config.general.ticketPrefix} ${user.username}`, {
                type: "text",
                parent: config.general.ticketCategoryId,
                permissionOverwrites: [{
                    id: button.guild.id,
                    deny: "VIEW_CHANNEL"
                }, {
                    id: user.id,
                    allow: "VIEW_CHANNEL"
                }]
            }).then(async ticketChannel => {
                var embed2 = new MessageEmbed()
                    .setColor(config.embeds.embedNeutralColor)
                    .setTitle(config.embeds.newTicketEmbed.title)
                    .setDescription(config.embeds.newTicketEmbed.text.replace("%user%", user))
                    .setFooter(config.embeds.embedFooter)
                ticketChannel.send(`${user}`, embed2)
            })
        }
    }
}