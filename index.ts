import { Intents } from './deps.ts'
import { Client } from './src/classes/Client.ts'
import { onReady } from './src/events/onReady.ts'
import { onMessage } from './src/events/onMessage.ts'

const client = new Client()

client.on('ready', onReady)
client.on('messageCreate', onMessage)

await client.run(Intents.None)
