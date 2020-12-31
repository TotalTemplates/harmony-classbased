import { Client } from "../classes/Client.ts"

export function onReady (client: Client) {
  console.log(client.user?.username + ' is now online!')
  console.log('ㄴprefix: ' + client.settings.prefix)
}
