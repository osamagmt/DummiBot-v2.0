const Discord = require("discord.js");
const { Command } = require('discord-akairo');
function capitalize(name) {
	name = name.toLowerCase();
	return name.charAt(0).toUpperCase() + name.slice(1)
};
class RoleInfoCommand extends Command {
	constructor() {
		super('roleinfo', {
			aliases: ['roleinfo', 'ri'],
			category: 'info',
			description: 'Get general info about mentioned role.',
			ownerOnly: false,
			channel: 'guild'
		})
	}

async exec(message) {
const role = message.mentions.roles.first();
	if (!role) {
		let embed0 = new Discord.MessageEmbed()
			.setTitle('please enter a valid role.')
			.setColor(0xaa00cc)
			return message.util.reply(embed0)
			.then(message => {
				setTimeout(function() {
					message.delete(embed0)
				}, 5000);
			})
		}
		var permissions = [];
		for (var i = 0; i < role.permissions.toArray().length; i++) {
			permissions.push(capitalize("`" + role.permissions.toArray()[i].replace(/_/g, " ") + "`"));
		}
		let membersWithRole = role.members
		let embed = new Discord.MessageEmbed()
			.setColor(0xaa00cc)
			.setThumbnail(message.guild.iconURL())
			.setTitle('Role Info')
			.addField('| Name', role.name, true)
			.addField('| ID', role.id, true)
			.addField('| Creation Date', role.createdAt.toDateString(), true)
			.addField('| Bot role', role.managed ? "yes" : "no", true)
			.addField('| Members in this role', membersWithRole.size, true)
			.addField('| Position', message.guild.roles.cache.array().length - role.rawPosition + 1, true)
			.addField('| Color', "hex: " + role.hexColor + "\n" + "number: " + role.color, true)
			.addField('| Hoisted', role.hoist ? 'Yes' : 'No', true)
			.addField('| Mentionable', role.mentionable ? 'Yes' : 'No', true)
			.addField('| Permissions', permissions.join(', ') || 'None')
			.setFooter('This message gets deleted after 2 minutes.')			
		message.util.send(embed)
		.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
    }
};

module.exports = RoleInfoCommand;