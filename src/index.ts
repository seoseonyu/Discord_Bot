import { readdirSync } from "fs";


const commandFiles = readdirSync('./commands')
    .filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    console.log(file)
}

// console.log(commandFiles)