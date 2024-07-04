import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { authRoute } from './auth/auth.route'

const app = new Hono()
app.route('/api',authRoute)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
