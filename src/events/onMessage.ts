import { Query } from '../classes/Query.ts'
import { Client } from '../classes/Client.ts'
import { Message } from '../../deps.ts'

export function onMessage (client: Client, msg: Message) {
  const { prefix } = client.settings

  if (msg.author.bot) return
  if (!msg.content.startsWith(prefix)) return

  const query = new Query(msg.content, prefix)

  const target = client.commands.find(({ run, aliases }) =>
    typeof run === 'function' && aliases.includes(query.cmd))
  
  if (!target) return
  target.run(client, msg, query)
}
