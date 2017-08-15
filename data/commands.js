/*
 * Why is this a .js file?
 * Because there are functions in the object.
 */

const	chalk		=	require('chalk');
const   config  	=   require('./../config.json');
const   prefix  	=   config.botSettings.commandHandling.prefix;
const   formatting  =   require('./../lib/formatting.js');
const   emojis  	=   require('./../lib/emoji.js');
const   footergen   =   require('./../lib/footer.js');

module.exports = [
    {
        name: "help",
        description: "Shows help screen.",
        action: function(message) {
            var response = [];
            module.exports.forEach(function(element) {
                response.push({
                    name: `${formatting.code}${prefix}${element.name}${formatting.code}`,
                    value: element.description,
                    inline: true
                });
            });
            message.author.send({
                embed: {
                    title: "Commands",
                    description: "These are the commands you can use with Yei.",
                    fields: response,
                    footer: footergen(message.client)
                }
            }).then(function(){
                if (message.channel.type != "dm"){
                    message.reply(`Check your DMs. ${emojis.raised_hands}`);
                }
            }, function(error){
                message.reply(`An error occurred. ${emojis.sad}`);
                console.log(`[${chalk.red("ERROR")}] "${prefix}help" command encountered an error: "${error}".`);
            });
        }
    },
    {
        name: "roll [x]",
        description: "Roll a dice with x sides. (default is 6)",
        action: function(message) {
            var commanddata = message.content.substr(prefix.length, message.length);
            var commandargs = commanddata.split(" "); //split command arguments by spaces
            commandargs.shift(); //pop first element (command name)
            var max = 6;
            var min = 1;
            if (commandargs.length > 0){
                var userMax = parseInt(commandargs[0]);
                if (isNaN(userMax)){
                    message.reply(`Invalid number ${formatting.code}${commandargs[0]}${formatting.code}.`);
                    return;
                } else {
                    max = userMax;
                }
            }
            var rand = Math.floor(Math.random() * (max - min + 1)) + min;
            if (max == 666){
                rand = max;
            }
            message.reply(`You rolled ${formatting.code}${rand}${formatting.code}.`);
        }
    },
    {
        name: "ping",
        description: "How about a battle?",
        action: function(message) {
            message.reply("Pong!");
        }
    }
]