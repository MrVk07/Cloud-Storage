import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import cloudinary from './utils/cloudinary.js'
import connectToMongo from './db.js'
import FileRoute from './routes/AddFileRoute.js'

dotenv.config()
const app = express()
app.use(cors());
connectToMongo()

const port = process.env.PORT || 5000

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))


app.get('/api/images', async (req, res) => {
    const { resources } = await cloudinary.search
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
});

app.use('/api', FileRoute)

// app.post('/api/upload', async (req, res) => {
//     try {
//         const fileStr = req.body.data
//         const uploadedResponse = await cloudinary.uploader
//             .upload(fileStr)
//         console.log(uploadedResponse)

//     } catch (error) {
//         console.error(error)
//     }
// })

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})