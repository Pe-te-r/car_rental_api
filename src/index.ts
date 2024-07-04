import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { authRoute } from './auth/auth.route'
import { vehicleRoute } from './vehicles/vehicles.route'
import { VehicleSpectsRoute } from './vehicle_spects/spects.route'
import { locationRoute } from './location/locations.route'

const app = new Hono()
app.route('/api',authRoute)
app.route('/api',vehicleRoute)
app.route('/api',VehicleSpectsRoute)
app.route('/api',locationRoute)
app.route('/api',vehicleRoute)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
