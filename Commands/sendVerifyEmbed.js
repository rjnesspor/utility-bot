const { MessageEmbed, Message } = require("discord.js")
const config = require("../config.json")
const {MessageButton} = require('discord-buttons')

module.exports = {
    name: "verifyEmbed",
    type: 'staff',
    args: false,
    description: "Sends the verify embed.",
    execute(message, args, client) {
        const embed = new MessageEmbed()
        .setColor(config.embeds.embedNeutralColor)
        .setTitle(config.embeds.verificationEmbed.title)
        .setDescription(config.embeds.verificationEmbed.text)
        .setFooter(config.embeds.embedFooter)
        let button = new MessageButton()
        .setStyle(config.buttons.verificationButton.style)
        .setEmoji(config.buttons.verificationButton.emoji)
        .setLabel(config.buttons.verificationButton.label)
        .setID("verify")
        message.delete()
        message.channel.send({component: button, embed: embed})
    }
}