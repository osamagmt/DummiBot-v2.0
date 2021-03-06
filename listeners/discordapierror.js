const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
class DiscordAPIErrorListener extends Listener {
    constructor() {
        super('discordapierror', {
            emitter: 'process',
            event: 'DiscordAPIError'
        });
    }

    async exec(error, message, command) {
        const tracebackChannel = this.client.channels.cache.get('805529461394112542')
        const logsChannel = this.client.channels.cache.get("787659536710238238")
        await tracebackChannel.send(embed)
        let errorEmbed = new Discord.MessageEmbed()
        .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
        .setColor(0xaa00cc)
        let m = await logsChannel.send(errorEmbed)
        let reason = error.message
        let embed = new Discord.MessageEmbed()
        .setTitle('Discord API error traceback')
        .setColor(0xAA00CC)
        .addField('Author', message.author.username)
        if (message.guild.name !== null) {
            embed = embed.addField('Server', message.guild.name)
        }
        if (message.channel.id !== undefined) {
            let invite = message.channel.createInvite()
		    let invited = await invite
            embed = embed.addField('Server link', `[${message.guild.name}](${invited})`)
        }
        embed
        /*if (message.channel.id !== undefined) {
            let Url = await message.logsChannel.lastMessage.get(message.url)
            embed = embed.addField('Error link', `[message link](${Url})`)
        }
        embed*/
            .addField('Error log', `[${command.id}](${m.url})`)
            .addField('Command', command.id)
            .addField('Reason', reason)
        
    }
}

console.log('Discord API error handler ready!')
module.exports = DiscordAPIErrorListener;