const {
	MessageEmbed
} = require('discord.js');
const config = require("../config.json");
const ms = require("ms")

module.exports = {
	name: "kick",
	type: "staff",
	description: 'Kicks a desired user',
	args: true,
	usage: '<user> [reason]',
	async execute(message, args) {
		var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!user) {
			const noUser = new MessageEmbed()
				.setColor(config.embeds.embedErrorColor)
				.setTitle(config.embeds.noUserEmbed.title)
				.setDescription(config.embeds.noUserEmbed.text)
				.setTimestamp();
			var xyz = await message.channel.send(noUser)
			setTimeout(() => {
				message.delete()
				xyz.delete()
			}, ms(config.general.commandDeleteTimer));
			return;
		}

		var reason = args.slice(1).join(' ');
		if (!reason) reason = 'No reason provided.';

		if (message.member.roles.highest.position <= user.roles.highest.position) {
			const lowerRole = new MessageEmbed()
				.setColor(config.embeds.embedErrorColor)
				.setTitle(config.embeds.higherRoleErrorEmbed.title)
				.setDescription(config.embeds.higherRoleErrorEmbed.text)
				.setTimestamp();
			var xyz = await message.channel.send(lowerRole)
			setTimeout(() => {
				message.delete()
				xyz.delete()
			}, ms(config.general.commandDeleteTimer));
			return;
		}

		const successKick = new MessageEmbed()
			.setColor(config.embeds.embedSuccessColor)
			.setFooter(config.embeds.embedFooter)
			.setTimestamp()
			.setDescription(config.embeds.embedKickSuccess.text.replace("%user%", user).replace("%reason%", reason))
			.setTitle(config.embeds.embedKickSuccess.title)
		var xyz = await message.channel.send(successKick)
		setTimeout(() => {
			message.delete()
			xyz.delete()
		}, ms(config.general.commandDeleteTimer));

		try {
			await user.kick(reason);
		} catch (err) {
			console.log(err);
			message.channel.send(`I was unable to kick the member mentioned.`);
			return;
		}
	}

};