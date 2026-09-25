import { createApp } from '../src/app.js'

let app: Awaited<ReturnType<typeof createApp>>

export default async function handler(
  req: any,
  res: any
) {
  if (!app) {
    app = await createApp()
  }

  return app(req, res)
}