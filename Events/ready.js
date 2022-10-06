const chalk = require("chalk")
const config = require("../config.json")

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        const vc = client.channels.cache.get(config.general.vipVoiceChannelId)
        const guild = client.guilds.cache.get(config.general.guildId)
        await guild.members.fetch()
        const role = guild.roles.cache.get(config.general.vipRoleId)
        const count = role.members.size
        vc.setName(config.general.vipVoiceChannelFormat.replace("%count%", count))
        console.log(chalk.green(`Successfully logged in as ${client.user.tag}!`))
        console.log(chalk.green("Bot is online!"))
    }
}