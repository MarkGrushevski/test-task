import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './secret.js'

export default (req, res, next) => {
    try {
        const token = req.cookies['jwt']
        if (token) {
            req.user = jwt.verify(token, JWT_SECRET)
        }
        next()
    } catch {
        res.sendStatus(403)
    }
}
