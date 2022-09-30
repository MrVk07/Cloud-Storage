import axios from 'axios'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";


function Upload() {
    const navigate = useNavigate();
    const [dataOfFile, setdataOfFile] = useState({ id: "", title: "", description: "", FileUrl: "" })
    const [loading, setLoading] = useState(false)
    const handleFileInputChange = (e) => {
        // console.log("2");
        const file = e.target.files[0]
        // console.log(file.name)
        console.log(file.name.slice(-3))
        if (file.name.slice(-3) === "jpg" || file.name.slice(-3) === "png" || file.name.slice(-3) === "gif") {
            // previewFile(file)
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setdataOfFile({ ...dataOfFile, FileUrl: reader.result, id: uuidv4() })
                // console.log(dataOfFile.FileUrl)
            }
        }
    }

    const handleSubmitFile = async () => {
        if (!dataOfFile.FileUrl) {
            console.log("returning without submit");
            return
        }
        setLoading(true)
        // console.log(dataOfFile)
        // console.log(dataOfFile.FileUrl)
        const res = await uploadImage()
        console.log("success");
        setdataOfFile({ id: "", title: "", description: "", FileUrl: "" })
        console.log(res)
        if (res.data.msg === "success") {
            setLoading(false)
            navigate("/gallery");
        }

    }

    const uploadImage = async () => {
        try {
            const res = await axios.post('/api/upload', { dataOfFile })
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const handleData = (e) => {
        setdataOfFile({ ...dataOfFile, [e.target.id]: e.target.value })
    }

    return (
        <>
            <div>
                <h1>Upload</h1>
                <div className="mb-2">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="input" className="form-control" id="title" placeholder="Title" onChange={handleData} value={dataOfFile.title} required />
                    <h6 className='mt-1 mb-0' style={{ opacity: "50%" }}>Atleast 5 characters</h6>
                </div>
                <div className="mb-2">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" rows="3" onChange={handleData} value={dataOfFile.description} required></textarea>
                    <h6 className='mt-1 mb-0' style={{ opacity: "50%" }}>Atleast 5 characters</h6>
                </div>
                <div className="mb-2">
                    <label htmlFor="file" className="form-label">File</label>
                    <input type="file" className="form-control" id="file" onChange={handleFileInputChange} />
                </div>
            </div>
            <button className='btn btn-primary' disabled={dataOfFile.title.length < 5 || dataOfFile.description.length < 5} onClick={handleSubmitFile}>Submit</button>
            {dataOfFile.FileUrl &&
                <img src={dataOfFile.FileUrl} alt="file" style={{ height: '150px' }} />
            }
            {loading ? <h3>Loading...</h3> : <h3></h3>}
        </>
    )
}

export default Upload