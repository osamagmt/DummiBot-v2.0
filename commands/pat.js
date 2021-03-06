const {randColor} = require("../funcs.js")
const randomImages = [
    'https://media1.tenor.com/images/e01e09d8e27c7247314b3dd611f47007/tenor.gif?itemid=13912621',
    'https://media1.tenor.com/images/b7ddddf6d6da303dcdc3823959192b42/tenor.gif?itemid=15586999',
    'https://media1.tenor.com/images/be0c22e0af951aa7fa8753381663eb2c/tenor.gif?itemid=15824856',
    'https://media1.tenor.com/images/c3fe204c1bf0f81787fba429e6194827/tenor.gif?itemid=11455730'
]
const { Command } = require('discord-akairo');
const Discord = require("discord.js");

class PatCommand extends Command {
    constructor() {
        super('pat', {
            aliases: ['pat'],
            category: 'actions',
            description: 'Pat someone',
            ownerOnly: false,
            channel: ['guild']
        })
    }

        async exec(message, args) {
            args[0] = message.mentions.users.first()
            let SelfEmbed = new Discord.MessageEmbed()
                .setTitle('You can\'t pat yourself...')
                .setColor(0xaa00cc);
            let BotEmbed = new Discord.MessageEmbed()
                .setTitle('Thank you!?')
                .setColor(0xaa00cc);
            let NoneEmbed = new Discord.MessageEmbed()
                .setTitle('You need to specify a user')
                .setColor(0xaa00cc);
            const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
            let embed = new Discord.MessageEmbed()
                .setDescription(`**<@${message.author.id}> Pats ${args[0]}!!**`)
                .setImage(randomImage)
                .setColor(randColor());
        // If you mention no one.
            if (args[0] === undefined) {
                return message.util.send(NoneEmbed)
            .then(message => {
                setTimeout(function() {
                    message.delete(NoneEmbed)
                }, 5000);
            })
        }
        // If you mention yourself.
            if (args[0].id === message.author.id) {
                return message.util.send(SelfEmbed)
            .then(message => {
            setTimeout(function() {
                message.delete(SelfEmbed)
                    }, 5000);
                })
            }
        // If you mention the bot.
            if (args[0].id === message.client.user.id) {
                return message.util.send(BotEmbed)
            .then(message => {
            setTimeout(function() {
            message.delete(BotEmbed)
                    }, 5000);
                })
            }
        
        // When you mention someone
            else {
            await message.util.send(embed);
            }
            
        }
};

module.exports = PatCommand;