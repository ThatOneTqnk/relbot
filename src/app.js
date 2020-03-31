require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = ".";
const Manager = require('./command/commandManager');
const cmdManager = new Manager();

const FlushCmd = require('./command/commands/flushSkripts');
const UploadCmd = require('./command/commands/uploadSkripts');

cmdManager.registerCommand(new FlushCmd());
cmdManager.registerCommand(new UploadCmd());

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.bot) return;
    else if (!msg.content.startsWith(PREFIX)) return;
    if(!(([...msg.guild.member(msg.author).roles.cache.values()]).some(r => r.name.toLowerCase() === 'developer'))) {
      msg.channel.send("Must have developer role to use relbot!");
      return;
    }

    const command = msg.content.slice(PREFIX.length);
    if (command.length === 0) return;
    
    cmdManager.readCommand(command, (err, data) => {
      if (err && err === Manager.CODES.COMMAND_NOT_FOUND) {
        msg.channel.send("Command could not be found");
        return;
      }
      msg.channel.send(data);
    });
});

client.login(process.env.DTOKEN);