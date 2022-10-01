import express from 'express';
import cloudinary from '../utils/cloudinary.js'
import file from '../model/File.js'

const router = express.Router()

router.post('/upload', async (req, res) => {
    try {
        // const fileStr = req.body.FileUrl
        const { id, title, description, FileUrl } = req.body.dataOfFile
        const uploadedResponse = await cloudinary.uploader
            .upload(FileUrl)
        // console.log(uploadedResponse)
        let urlOfFile = uploadedResponse.url
        console.log(urlOfFile, "--");
        const newfile = new file({
            id, title, description, urlOfFile
        })
        const savedFile = await newfile.save()
        console.log(savedFile)
        res.send({ msg: "success" })
    } catch (error) {
        console.error(error)
    }
})

router.get('/getallfiles', async (req, res) => {
    try {
        let foundFiles = await file.find()
        res.json(foundFiles)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        let idOfFile = req.params.id
        let deletefile = await file.findOne({ id: idOfFile }, (error, data) => {
            if (error) {
                console.log(error);
            }
            else {
                let str1 = data.urlOfFile
                let delstringarr = str1.split('/')
                let delstring = delstringarr[delstringarr.length - 1].slice(0, -4)
                // console.log(delstring, "stirng");
                const deleteresponse = cloudinary.uploader.destroy(delstring, function (error, result) {
                    console.log(result, error)
                })
            }
        })
        await file.findOneAndDelete(({ id: idOfFile }), function (err, docs) {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                if (docs == null) {
                    res.send("Wrong id")
                } else {
                    res.send({ msg: "deleted" })
                }
            }
        })

    } catch (error) {
        console.log(error)
    }
})

export default router