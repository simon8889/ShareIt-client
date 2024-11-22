import { uploadFile } from "../../../api/FileService"
import { useEffect, useRef, useState } from "react"
import { PiSpinnerBold } from "react-icons/pi"
import { FaFileUpload } from "react-icons/fa"
import { IoIosClose } from "react-icons/io"
import { IoIosEye } from "react-icons/io"
import { IoIosEyeOff } from "react-icons/io"
import "./FileToUpload.css"

type FileResponse = {
  File: string
}

export const FileToUpload = ({ file, removeFile }: { file: File, removeFile: () => void }) => {
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [linkCopied, setLinkCopied] = useState<boolean>(false)
  const [fileUrl, setFileUrl] = useState<string>("")
  const password = useRef<HTMLInputElement>(null)
  const extension = file ? file?.name.split(".")[1] : ""

  const handleSubmit = async () => {
    const passwordToSend = showPasswordInput && password.current?.value ? password.current?.value : null
    const response = await uploadFile(file, passwordToSend)
    if (!response.ok) return
    const data = await response.json() as FileResponse
    setFileUrl(`${window.location.origin}/files/${data.File}`)
  }

  const copyLink = () => {
    setLinkCopied(true)
    navigator.clipboard.writeText(fileUrl)
  }

  useEffect(() => {
    if (!password.current) return
    password.current.type = showPassword ? "text" : "password"
  }, [showPassword])

  return (
    <>
      {!fileUrl ?
        <section className='FileToUpload'>
          <IoIosClose className="FileToUpload__removeFile" onClick={removeFile} />
          <div className='FileToUpload__fileIcon'>
            <FaFileUpload />
            <span>{extension}</span>
          </div>
          <div className="FileToUpload__content">
            <h3>{file.name}</h3>
            <div>
              <span>Do you want to add a password to the file?</span>
              <input className="FileToUpload__checkbox" type="checkbox" onChange={() => setShowPasswordInput(!showPasswordInput)} />
            </div>
            <div>
              {showPasswordInput &&
                <div>
                  <input className="FileToUpload__password" type="password" min={8} ref={password} placeholder="password" />
                  <div onMouseEnter={() => setShowPassword(true)} onMouseLeave={() => setShowPassword(false)}>
                    {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                  </div>
                </div>

              }
              <button onClick={handleSubmit}>Share file</button>
            </div>
          </div>
        </section>
        :
        <section className="FileToUpload FileToUpload--uploaded">
          <h2>Here is your file: {file.name}</h2>
          <span>To share it click this <a href={fileUrl} target="_blank">link</a> or save this QR code</span>
          <img src={`${import.meta.env.PUBLIC_SHAREIT_API_URL}/v1/qr/generate?link=${fileUrl}`} />
          <div className="FileUpload__buttons">
            <button onClick={copyLink}>{linkCopied ? "Copied" : "Copy the link"}</button>
            <a
              href={`${import.meta.env.PUBLIC_SHAREIT_API_URL}/v1/qr/generate?link=${fileUrl}`}
              download={`QR_${file.name}.png`}
            >
              <button>Download QR</button>
            </a>
          </div>
        </section>
      }
    </>
  )
}
