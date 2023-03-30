import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import logger from 'morgan'
import mongoose from 'mongoose'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:8080',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(err => {
        console.log("Cannot connect to MongoDB", err)
        process.exit()
    })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})