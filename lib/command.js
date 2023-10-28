const   config  	=   require('./../config.json');
const   emojis  	=   require('./emoji.js'); //emoji object
const	formatting	=	require('./formatting.js'); //formatting object
const   prefix  	=   config.botSettings.commandHandling.prefix; //prefix specified in config.json
const	commands	=	require('./../data/commands.js'); //command object

function CommandResult(command, result){ //command result object
    CommandResult.prototype.command = command;
    CommandResult.prototype.result = result;
}

function Command(message) { //command object
    var command = Command.prototype.getCommand(message.content); //get command from message
    var result = Command.prototype.commandHandler(command, message); //execute command
    Command.prototype.result = new CommandResult(command, result); //return result
}

Command.prototype.commandHandler = function (command, message){
	if (command == null){ //if command is null return false as result
		return false;
	}

	var resolved = false;
	commands.forEach(function(element){ //find current command in command object
		var elementName = element.name.split(" ")[0];
		if (elementName == command) {
			element.action(message); //execute command action from command object
			resolved = true;
		}
	});
	if (!resolved) {
		message.reply(`Unknown command "${command}". ${emojis.sad}`);
	}
    return true;
};

Command.prototype.getCommand = function (content) {
	if (content.startsWith(prefix) && content.length > prefix.length){ //validate command
		var command = content.substr(prefix.length, content.length); //get command
		return command.split(" ")[0]; //return command
	} else {
		return null; //if command not valid return null
	}
};

function isCommand(content) { return content.startsWith(prefix) && content.length > prefix.length; } //check if command

module.exports.Command = Command;
module.exports.CommandResult = CommandResult;
module.exports.isCommand = isCommand;