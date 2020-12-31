export interface TempSettings {
  settingPath: string,
  settingExists: boolean
  commandsPath: string
  commandsExists: boolean
}

export interface ClientSettings {
  token?: string,
  prefix: string,
  [key: string]: undefined | null | boolean | number | string
}

export interface Command {
  name?: string,
  description?: string,
  run: (...args: any[]) => any,
  aliases: string[]
}
