require('dotenv').config();
const { readdirSync } = require('fs');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9')
const Discord = require('discord.js');
const Client = require('./struct/Client');
//----------

const client = new Client();
client.commands = new Discord.Collection();

const commands = [];
const commandFiles = readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

const clientId = process.env.clientId;
const guildId = '700801242284294325'

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command)
    commands.push(command.data.toJSON());
}


const rest = new REST({ version: '9' }).setToken(process.env.Token);
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
    console.log(interaction)
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})
// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`)
// })

// client.on('message', (message) => {

// })

client.login(process.env.Token);