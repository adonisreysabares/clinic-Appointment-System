import express from 'express'
import dotenv from 'dotenv'
import routerAppoint from './routes/Appointment.js'
import routerAuthentication from './routes/Authentication.js'
import cors from 'cors'
import session from 'express-session'
import isAuthenticated from './middleware/Auth.js'
import PgSession from 'connect-pg-simple'
import pool from './database/db.js'

dotenv.config()

const app = express()
const port = process.env.PORT
const pgSession = PgSession(session)

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}))

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'sessions',
    }),
    secret: "TOPSECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}))

app.use('/appointments', isAuthenticated, routerAppoint)
app.use('/authentication', routerAuthentication)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Internal Server Error' })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
