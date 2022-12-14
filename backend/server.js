import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectToMongo from './db.js'
import FileRoute from './routes/AddFileRoute.js'
import path from 'path'

dotenv.config()
const app = express()
app.use(cors());
connectToMongo()

const port = process.env.PORT || 5000

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', FileRoute)

const __dirname = path.resolve();

app.use(express.static('frontend/build/'))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})