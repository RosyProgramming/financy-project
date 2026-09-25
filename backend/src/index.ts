import { createApp } from './app'

async function bootstrap() {
  const app = await createApp()

  app.listen(4000, () => {
    console.log('Servidor iniciado na porta 4000')
  })
}

bootstrap()