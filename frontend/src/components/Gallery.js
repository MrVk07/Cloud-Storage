import { useEffect, useState } from 'react'
import axios from 'axios'


function Gallery() {
    const [allfiles, setAllfiles] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('/api/getallfiles').then((resp) => resp.data).then((data) => {
            setAllfiles(data)
            setLoading(false)
        })
        console.log(allfiles);
    }, []);

    return (
        <>
            <div className="container">
                {loading
                    ? <h1>loading</h1>
                    : (allfiles.length === 0 ? <h2 className='mt-3 text-center'><b>No files to display</b></h2>
                        : <div className="row mx-auto">
                            {allfiles.map((file) => {
                                return <div className="card" style={{ width: "18rem" }} key={file.id}>
                                    <img className="card-img-top" src={file.urlOfFile} alt="File" />
                                    <div className="card-body">
                                        <h5 className="card-title">{file.title}</h5>
                                        <p className="card-text">{file.description}</p>
                                        <button className='btn btn-primary' onClick={async () => {
                                            setLoading(true)
                                            let res = await axios.delete(`/api/delete/${file.id}`)
                                            console.log(res);
                                            if (res.data.msg === "deleted") {
                                                let newarr = allfiles.filter((item) => item.id !== file.id)
                                                setAllfiles(newarr)
                                                setLoading(false)
                                            }
                                        }}>Delete</button>
                                    </div>
                                </div>

                            })}
                        </div>)}

            </div>
        </>
    )
}

export default Gallery