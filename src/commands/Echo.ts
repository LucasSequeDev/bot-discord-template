import { ICommand, ICommander } from '../Core'

export class Echo implements ICommand {
  public alias: string = 'echo'
  public description: string = 'Reenvia el comando enviado por el usuario'
  public isCommand: boolean = true
  public when: string = 'messageCreate'

  execute ({ message }: { message: any }) {
    const isBot = message.author.bot
    if (isBot) return

    message.channel?.send(message.content)
  }
}