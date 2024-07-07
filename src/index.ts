import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { authRoute } from './auth/auth.route'
import { vehicleRoute } from './vehicles/vehicles.route'
import { VehicleSpectsRoute } from './vehicle_spects/spects.route'
import { locationRoute } from './location/locations.route'
import { usersRoute } from './users/users.route'
import { fleetRoute } from './fleet_management/fleet.route'
import { supportRoute } from './customer_support/support.route'
import { bookingRoute } from './bookings/bookings.route'

const app = new Hono()
app.route('/api',authRoute)
app.route('/api',usersRoute)
app.route('/api',vehicleRoute)
app.route('/api',VehicleSpectsRoute)
app.route('/api',locationRoute)
app.route('/api',vehicleRoute)
app.route('/api',fleetRoute)
app.route('/api',supportRoute)
app.route('/api',bookingRoute)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
