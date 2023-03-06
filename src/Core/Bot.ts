import { Client, Intents } from 'discord.js'
import { env } from '../config'

export interface IClient {
  on: (event: string, callback: (args: any) => void) => void
  once: (event: string, callback: (args: any) => void) => void
  login: (token: string) => Promise<string>
}

export interface IBot {
  isLogged: boolean
  client: IClient
}

export class Bot implements IBot {
  isLogged: boolean
  client: IClient

  constructor () {
    this.isLogged = false
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING] })
  }

  async login () {
    try {
      await this.client.login(env.discord.token!)
      this.isLogged = true
    } catch (error) {
      console.error(error)
      this.isLogged = false
    }
  }
}
