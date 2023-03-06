# Bot Discord Template

Podras crear tu propio bot para tus servidores de discord.

## Creacion de Bot

Para crear el bot, primero debes asegurarte de tener el DISCORD_TOKEN de tu bot. Puede visitar `https://discord.com/developers/applications` para mas informacion.

## Instalacion

Para instalar el proyecto, debes descargarte el proyecto con el siguiente comando:

`git clone https://github.com/LucasSequeDev/bot-discord-template.git myBot`

Luego, debes correr el siguiente comando

`npm install`

Por ultimo, puede correr el comando para comenzar a usar tu bot

`npm run dev`

## Configurar Bot

Para configurar el bot, debes tener el DISCORD_TOKEN y cargarlo en tu archivo de variables de entorno. Por ejemplo:

```
DISCORD_TOKEN=this-is-a-token
```

## Creacion de un comando

Para crear un nuevo comando, debes crear un archivo en la carpeta commands con la siguiente estructura:

```ts
import { ICommand, ICommander } from "../Core";

export class Echo implements ICommand {
  public alias: string = "echo";
  public description: string = "Reenvia el comando enviado por el usuario";
  public isCommand: boolean = true;
  public when: string = "messageCreate";

  execute({ message }: { message: any }) {
    const isBot = message.author.bot;
    if (isBot) return;

    message.channel?.send(message.content);
  }
}
```

Es importante la implementacion de la interface ICommand.

```ts
alias: string = 'Es el comando que se desea generar, por defecto se agrega un / para que funcione el comando. Ej /echo'
description: string = 'Se agrega un detalle de lo que realiza el comando.'
isCommand: boolean = 'Se detalla si es un comando o una action.'
when: string = 'Es el evento que estamos escuchando de nuestro servidor.'
execute: function = 'Es la funcion que dispara cuando ocurra el evento. Este puede recibir el mensaje y la comandera.'
```

## Registro de comando

Para registrar un nuevo comando, debes hacerlo en la comandera. La `comandera` es una clase `ICommender` que registra todos los comandos de nuestro Bot.

Para registrar el comando creado, debes incluirlo en la app.ts

```ts
import { Commander, Bot } from "./Core";
import { ListCommands } from "./commands/help";
import { Echo } from "./commands/Echo";

export const app = async () => {
  const bot = new Bot();

  await bot.login();

  if (!bot.isLogged) throw new Error("Discord bot is not connected");

  const commander = new Commander(bot.client);

  commander.register(new Echo());

  commander.register(new ListCommands());
};
```

El comando `ListCommands` es un comando para devolver todos los comandos registrados.

## Command vs Action

Los `Commands` se utilizan cuando se quiere registrar un evento, a partir de un mensaje ingresado por el usuario. Se lo puede identificar facilmente, ya que se utiliza el `/` antes de el. Por ejemplo `/comandos`.

Los `Actions` se utilizan para registrar un comportamiento, a partir de algo que ocurre en nuestro servidor. Por ej, escuchamos los mensajes creados, y detectamos un mensaje inapropiado, podriamos eliminar ese comentario.

Para definir si nuestro comando queremos que se comporte como `Command` o `Action`, debemos setear la propiedad `isCommand` dentro de nuestro comando. Cuando seteamos `true` se comportara como `Command`.

## Contribucion

Para colaborar con el proyecto, asegurar ser explicito en la problematica que se desea resolver. En la descripcion de la PR, se debera explicar el problema y como se plantea la solucion. Todas las PR's seran analizadas y debatidas a su tiempo.
