const { MessageEmbed, Message } = require("discord.js")
const config = require("../config.json")

module.exports = {
    name: "test",
    description: "Sends an embed message.",
    args: false,
    usage: "<title> | <text> | <color> | <footer>",
    execute(message, args, client) {
        return;
    }
}