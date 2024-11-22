import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileToUpload } from './FileToUpload/FileToUpload'
import "./DropFile.css"

export const DropFile = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });
  const [file, setFile] = useState<File | undefined>(undefined)

  const removeFile = () => {
    setFile(undefined)
  }

  return (
      <>
      {!file ?
          <section className="DropFile DropFile--border" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop your file here, or click to select a file</p>
          </section>
        :
          <section className='DropFile'>
            <FileToUpload file={file} removeFile={ removeFile }/>
          </section>
      }
      </>
  )
}