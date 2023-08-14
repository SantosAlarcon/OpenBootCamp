import { useState } from 'react'
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react"

const FileUploader = () => {
    const [files, setFiles] = useState([]);
    const [imageSrc, setImageSrc] = useState<string>();

    const updateFiles = (incomingFiles: ExtFile[]) => {
        setFiles(incomingFiles);
    }

    const handleSee = (imageSrc: string) => {
        setImageSrc(imageSrc);
    }

    const removeFile = (id: string) => {
        setFiles(files.filter((x: ExtFile) => x.id !== id))
    }

    return (
        <Dropzone onChange={updateFiles} value={files} localization='ES-es' maxFileSize={1024000} maxFiles={5} footer={true}
            accept='.ts, .js, .py'
            url="http://localhost:8000/api/uploadFile"
        >
            {files.map((file: ExtFile) => (
                <FileMosaic key={file.id} {...file} onSee={handleSee} onDelete={removeFile} preview resultOnTooltip />
            ))}
        </Dropzone>
    )
}

export default FileUploader
