const {
    MessageEmbed
} = require("discord.js");
const config = require("../config.json")
const prefix = config.prefix
const ms = require("ms")
const Discord = require("discord.js")

module.exports = {
    name: "message",
    async execute(message, client) {


        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift()

        const command = client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        if (!command) return;

        if (command.type == "staff" && !message.member.roles.cache.find(r => r.id === config.general.staffRoleId)) {
            var embedPermission = new MessageEmbed()
                .setColor(config.embeds.embedErrorColor)
                .setFooter(config.embeds.embedsFooter)
                .setDescription(config.embeds.noPermissionEmbed.text)
                .setTitle(config.embeds.noPermissionEmbed.title)
            var x = await message.channel.send(embedPermission)
            return setTimeout(() => {
                x.delete()
                message.delete()
            }, ms(config.general.commandDeleteTimer));
        }

        const {
            cooldowns
        } = client;

        if (command.args && !args.length) {
            var embed = new MessageEmbed()
                .setColor(config.embeds.embedErrorColor)
                .setFooter(config.embeds.embedsFooter)
                .setTitle(config.embeds.noArgumentsError.title)
                .setDescription(config.embeds.noArgumentsError.text.replace("%usage%", `${prefix}${command.name} ${command.usage}`))
            var x = await message.channel.send(embed)
            return setTimeout(() => {
                x.delete()
                message.delete()
            }, ms(config.general.commandDeleteTimer));
        }

        if (command.cooldown) {
            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = ms(command.cooldown)

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    const oncooldown = new MessageEmbed()
                        .setColor(config.embeds.embedErrorColor)
                        .setTitle(config.embeds.onCooldown.title)
                        .setDescription(config.embeds.onCooldown.text)
                        .setTimestamp()
                        .setFooter(config.embeds.embedFooter)
                    var x = await message.channel.send(oncooldown)
                    return setTimeout(() => {
                        x.delete()
                        message.delete()
                    }, ms(config.general.commandDeleteTimer));
                }
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }

        try {
            command.execute(message, args, client)
        } catch (error) {
            console.error(error)
            console.log("An error occurred while executing a command.")
        }
    }
}