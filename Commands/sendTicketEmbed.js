const { MessageEmbed, Message } = require("discord.js")
const config = require("../config.json")
const {MessageButton, MessageActionRow} = require('discord-buttons')

module.exports = {
    name: "ticketEmbed",
    type: "staff",
    description: "Sends the ticket embed.",
    execute(message, args, client) {
        const embed = new MessageEmbed()
        .setColor(config.embeds.embedNeutralColor)
        .setTitle(config.embeds.ticketEmbed.title)
        .setDescription(config.embeds.ticketEmbed.text)
        .setFooter(config.embeds.embedFooter)
        let button = new MessageButton()
        .setStyle(config.buttons.ticketButtonGeneral.style)
        .setEmoji(config.buttons.ticketButtonGeneral.emoji)
        .setLabel(config.buttons.ticketButtonGeneral.label)
        .setID("ticket")
        let button2 = new MessageButton()
        .setStyle(config.buttons.ticketButtonPayment.style)
        .setEmoji(config.buttons.ticketButtonPayment.emoji)
        .setLabel(config.buttons.ticketButtonPayment.label)
        .setID("payment")
        let buttonRow = new MessageActionRow()
        .addComponent(button)
        .addComponent(button2)
        message.delete()
        message.channel.send({components: [buttonRow], embed: embed})
    }
}