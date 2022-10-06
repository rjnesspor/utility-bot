const {
	MessageEmbed
} = require('discord.js');
const config = require("../config.json");
const ms = require("ms")


module.exports = {
	name: "ban",
	type: "staff",
	description: 'Bans a desired user',
	usage: '<user> [reason]',
	args: true,
	async execute(message, args) {
		var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!user) {
			const noUser = new MessageEmbed()
				.setColor(config.embeds.embedErrorColor)
				.setTitle(config.embeds.noUserEmbed.title)
				.setDescription(config.embeds.noUserEmbed.text)
				.setTimestamp();
			var x = await message.channel.send(noUser);
			setTimeout(() => {
				x.delete()
				message.delete()
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
			message.channel.send(lowerRole);
			return;
		}

		const successBan = new MessageEmbed()
			.setColor(config.embeds.embedSuccessColor)
			.setFooter(config.embeds.embedFooter)
			.setTimestamp()
			.setDescription(config.embeds.embedBanSuccess.text.replace("%user%", user).replace("%reason%", reason))
			.setTitle(config.embeds.embedBanSuccess.title)
		message.channel.send(successBan);

		try {
			await user.ban({
				reason: reason
			});
		} catch (err) {
			console.log(err);
			message.channel.send(`I was unable to ban the member mentioned.`);
			return;
		}
	}

};