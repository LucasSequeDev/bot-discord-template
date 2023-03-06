import dotenv from 'dotenv'

dotenv.config()

export const env = {
  discord: {
    token: process.env.DISCORD_TOKEN
  }
}
