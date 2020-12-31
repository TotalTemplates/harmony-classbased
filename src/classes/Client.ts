import { Client as rawClient, GatewayIntents } from '../../deps.ts'
import { ClientSettings, Command, TempSettings } from "../types/clientTypes.ts"
import { getEnv, readRecursively, existsSync } from "../utils/utils.ts"

export class Client extends rawClient {
  private _: TempSettings
  public settings: ClientSettings
  public commands: Command[]

  constructor () {
    super()
    const settingPath = Deno.cwd() + '/config.json'
    const commandsPath = Deno.cwd() + '/src/commands'

    this._ = {
      settingPath,
      commandsPath,
      settingExists: existsSync(settingPath),
      commandsExists: existsSync(commandsPath)
    }

    if (!this._.commandsExists)
      throw new Error('./src/commands folder not found')

    if (this._.settingExists) {
      const text = Deno.readTextFileSync(this._.settingPath)
      const {
        token = getEnv('token'),
        prefix = getEnv('prefix') || '!',
        ...etc } = JSON.parse(text)

      this.settings = { token, prefix, ...etc }
    } else {
      const token = getEnv('token')
      const prefix = getEnv('prefix') || '!'

      this.settings = { token, prefix }
    }

    if (!this.settings.token)
      throw new Error('token cannot find anywhere (config.json, envvars)')

    this.commands = []
  }

  async run (intent: GatewayIntents[]) {
    const commands = readRecursively(this._.commandsPath)
    for (const command of commands) {
      if (!command.endsWith('.ts')) continue
      this.commands.push(await import(command))
    }
    super.connect(this.settings.token, intent)
  }

  on (type: string | symbol, fn: (...args: any[]) => void): this {
    return super.on(type, (...args) => {
      fn(this, ...args)
    })
  }
}
