import { ICommand, ICommander } from '../../Core'

export class ListCommands implements ICommand {
  public alias: string = 'comandos'
  public description: string = 'Envia todos los comandos disponibles. (Solo en el canal de comandos)'
  public isCommand: boolean = true
  public when: string = 'messageCreate'

  execute ({ message, commander }: { message: any, commander: ICommander }) {
    const isBot = message.author.bot
    if (isBot) return

    if (Object.entries(commander.commands).length === 0) return message.member?.send('***No hay comandos registrados***')

    const commands = Object.entries(commander.commands).filter(([alias, { command }]) => command.isCommand ? command : null)
    const actions = Object.entries(commander.commands).filter(([alias, { command }]) => command.isCommand ? null : command)

    if (commands.length === 0) return message.member?.send('***No hay comandos disponibles***')

    const comandsPrompt = commands.map(([alias, config]) => {
      const spaces = 60 - (alias.length * 2) - (Math.floor(alias.length / 2))

      const tabsString = '.'.repeat(spaces)

      return `**/${alias}**${tabsString}*${config.command.description}*`
    }).join('\n')

    const actionsPrompt = (actions.length === 0)
      ? 'No hay acciones configuradas'
      : actions.map(([alias, config]) => {
        const spaces = 60 - (alias.length * 2) - (Math.floor(alias.length / 2))

        const tabsString = '.'.repeat(spaces)

        return `- **${alias}**${tabsString}*${config.command.description}*`
      }).join('\n')

    if (message.channel?.name === 'prueba-bots') {
      message.channel?.send(`***Los comandos disponibles*** 
${comandsPrompt}


***Las acciones disponibles***
${actionsPrompt}`)
    } else {
      message.member?.send(`***Los comandos disponibles*** 
${comandsPrompt}


***Las acciones disponibles***
${actionsPrompt}`)
    }
  }
}
