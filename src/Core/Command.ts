import { ICommander } from './'

export interface ICommand {
  alias: string
  description: string
  execute: ({ message, commander }: {message: any, commander: ICommander }) => void
  isCommand: boolean
  when: string
}
