import express from 'express'
import cors from 'cors'
import { orderByDistance } from 'geolib'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { getFilteredStoresByName, getStores } from './stores.service.js'
import { getUser } from './users.service.js'
import { JWT_SECRET } from './secret.js'
import authGuard from './auth.guard.js'

const app = express()
app.use(
    cors({ credentials: true, origin: ['http://localhost:9000', 'http://localhost:9100', 'http://localhost:3000'] })
)
app.use(express.json())
app.use(cookieParser())
app.use(authGuard)

app.get('/stores', async (req, res) => {
    let storesByCity = await getStores()

    // filter by city name
    const city = req.query['city']
    if (city) {
        storesByCity = storesByCity.filter((shop) => shop.city.toLowerCase() === city.toLowerCase())
    }

    // flat stores
    let stores = storesByCity.map((storeByCity) => storeByCity.stores).flat()

    // filter and sort by store name
    const storeName = req.query['name']
    if (storeName) {
        stores = getFilteredStoresByName(stores, storeName)
    }

    // return only store names for autocomplete suggestions
    const only = req.query['only']
    if (only === 'name') {
        stores = stores.map((store) => store.name)
        return res.send(stores)
    }

    // order by distance to user pos
    const lat = req.query['lat']
    const lon = req.query['lon']
    if (lat && lon) {
        const currentPos = { lat, lon }

        stores = orderByDistance(currentPos, stores)
    }

    // remove admin fields
    if (!req.user?.username) {
        stores.forEach((store) => {
            delete store.address
        })
    }

    res.send(stores)
})

app.post('/admin/login', async (req, res) => {
    const { username = '', password = '' } = req.body
    console.log('cookies', req.cookies)
    const jwtUser = req.user
    if (jwtUser) {
        const user = await getUser(jwtUser.username)
        if (user) {
            return res.sendStatus(200)
        } else {
            res.clearCookie('jwt', { httpOnly: true })
            return res.sendStatus(401)
        }
    } else {
        const user = await getUser(username)
        if (user?.password === password) {
            const token = jwt.sign({ sub: user.id, username }, JWT_SECRET)

            res.cookie('jwt', token, {
                maxAge: 1000 * 60 * 20,
                expires: new Date(Date.now() + 1000 * 60 * 20),
                httpOnly: true,
                secure: false
            })

            return res.send(true)
        } else {
            res.clearCookie('jwt', { httpOnly: true })
            return res.sendStatus(401)
        }
    }
})

app.listen(8000)
