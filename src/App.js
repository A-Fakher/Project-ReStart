import React , {useState} from 'react';
import S3 from 'react-aws-s3';
// installed using npm install buffer --save
import "./App.css"
window.Buffer = window.Buffer || require("buffer").Buffer;

const Upload = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    // the configuration information is fetched from the .env file
    const config = {
        bucketName: "",
        region: "",
        accessKeyId: "",
        secretAccessKey: "",
    }

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = async (file) => {
        const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(file, file.name)
        .then(data => console.log(data.location))
        .catch(err => console.error(err))
    }
    return <div className='App'>
        <div>Upload your build.zip file</div>
        <input type="file" onChange={handleFileInput}/>
        <br></br>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
}

export default Upload;