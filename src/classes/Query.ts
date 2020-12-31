export class Query {
  raw: string
  prefix: string
  content: string
  splited: string[]
  cmd: string
  args: string[]

  constructor(raw: string = '', prefix: string = '!') {
    this.raw = raw
    this.prefix = prefix
    this.content = raw.split(prefix)[1]
    this.splited = this.content.split(' ')
    this.cmd = this.splited[0]
    this.args = this.splited.splice(1)
  }
}
