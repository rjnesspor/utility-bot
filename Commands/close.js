const {
    MessageEmbed,
    Message
} = require("discord.js")
const config = require("../config.json")

module.exports = {
    name: "close",
    description: "Closes a ticket.",
    type: "staff",
    execute(message, args, client) {
        if (message.channel.name.startsWith(config.general.ticketPrefix)) {
            message.channel.delete();
            setTimeout(() => {
                message.delete()
            }, ms(config.general.commandDeleteTimer));
        }
    }
}