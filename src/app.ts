import { ListCommands } from './commands/help'
import { Echo } from "./commands/Echo";
import { Commander, Bot } from './Core'

export const app = async () => {
  const bot = new Bot()

  await bot.login()

  if (!bot.isLogged) throw new Error('Discord bot is not connected')

  const commander = new Commander(bot.client)

  commander.register(new Echo())
  
  commander.register(new ListCommands())
}
