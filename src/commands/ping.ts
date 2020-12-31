import { Message } from '../../deps.ts'
import { Client } from '../classes/Client.ts'

export function run (client: Client, msg: Message) {
  msg.channel.send('pong! (' + Math.round(client.ping) + 'ms)')
}

export const name = 'ping'
export const aliases = ['ping', 'pong']
export const description = 'latency of discord gateway'
