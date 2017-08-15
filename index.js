const	Discord		=	require('discord.js');							//discord library
const	chalk		=	require('chalk');								//colored console text
const	Command		=	require('./lib/command.js').Command;
var		isCommand	=	require('./lib/command.js').isCommand;

const	config		=	require('./config.json');
const	prefix		=	config.botSettings.commandHandling.prefix;		//prefix specified in config.json

const	client		=	new Discord.Client();							//init discord client

process.on("SIGINT", function() { //gracefully exit on ^C
	client.destroy(); //logout of discord
	console.log(`[${chalk.blue("STATUS")}] Goodbye!`);
	process.exit(); //kill process (like what's supposed to happen)
});

function isBot(user) { //is the user a bot?
	return user.bot; //ez pz
}

client.on("ready", () => { //when logged in
	console.log(`[${chalk.blue("STATUS")}] Up and running!`);
	client.user.setGame("with invisibility"); //set game text | TODO: cycle stats (current, x users, x shards) (5s interval)
});

client.on("message", message => { //on message
	if (!isBot(message.author)) { //don't treat bots' messages as commands 
		if (isCommand(message.content)){ //check if the message is a command
			var result = new Command(message).result; //handle command (lib/command.js:12) and put result (lib/command.js:7) into var
			console.log(`[${chalk.blue("STATUS")}] Processing command "${prefix}${result.command}"`);
			if (!result.result) { //if there was an error
				console.log(`[${chalk.yellow("WARNING")}] Problem with lib/command.js for message "${message.content}".`); //that shouldnt happen
			}
		}
	}
});

client.login(process.env.YEI_BOT_TOKEN); //login from env var