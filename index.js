const fs = require("fs");
const chalk = require('chalk')
const Discord = require("discord.js");
const {
    prefix,
    token
} = require("./config.json");

const client = new Discord.Client();
require("discord-buttons")(client)
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const cmdFiles = fs.readdirSync("./Commands").filter(f => f.endsWith(".js"));
const eventFiles = fs.readdirSync("./Events").filter(f => f.endsWith(".js"));

for (const file of cmdFiles) {
    const command = require(`./Commands/${file}`)
    client.commands.set(command.name, command)
    console.log(chalk.green(`Successfully loaded cmdFile ${file}!`))
}

for (const file of eventFiles) {
    const event = require(`./Events/${file}`)
    console.log(chalk.green(`Successfully loaded eventFile ${file}!`))
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

client.login(token)