import { IClient, ICommand } from './'

interface ICommands {
  [key: string]: { command: ICommand }
}

export interface ICommander {
  client: IClient
  commands: ICommands
  register: (command: ICommand) => void
}

export class Commander implements ICommander {
  public commands: ICommands = {}

  constructor (public client: IClient) {
    this.setup()
  }

  register (command: ICommand) {
    this.client.on(command.when, (message) => {
      const { content } = message

      if (command.isCommand) {
        if (content.startsWith('/' + command.alias)) {
          command.execute({ message, commander: this })
        }
      } else {
        command.execute({ message, commander: this })
      }
    })

    this.commands[command.alias] = { command }
  }

  private setup () {
    this.client.once('ready', (bot) => {
      console.log(`Logged in as ${bot.user.tag}!`)
    })
    this.client.on('error', (error) => {
      console.error(error)
    })
  }
}
