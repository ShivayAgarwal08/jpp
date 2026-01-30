import { createServer } from 'vite'
try {
  const server = await createServer({
    // configFile: './vite.config.js',
    server: { port: 5173 }
  })
  await server.listen()
  server.printUrls()
} catch (e) {
  console.error('VITE ERROR:', e)
  process.exit(1)
}
