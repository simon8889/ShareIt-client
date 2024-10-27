import { useState } from "react"
import { FaFileDownload } from "react-icons/fa" 
import "./DownloadFile.css"
import { PiSpinnerBold } from "react-icons/pi";
import { MdDownloading } from "react-icons/md";


const DownloadPage = ({ fileToSearch, filename, hasPassword }: {fileToSearch: string, filename: string, hasPassword: boolean}) => {
  const [password, setPassword] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    const body = {
      file_id: fileToSearch,
      password: password
    }
    
    setIsLoading(true)
    const response = await fetch(`${import.meta.env.PUBLIC_SHAREIT_API_URL}/v1/files/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    
    setStatusCode(response.status)
    if(!response.ok) return
    const disposition = response.headers.get("Content-Disposition")
    const filename = disposition && disposition.includes("filename=") 
      ? disposition.split("filename=")[1] : "archivo.dat"
      
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const tempLink = document.createElement("a")
    
    tempLink.href = url
    tempLink.download = filename
    document.body.appendChild(tempLink)
    tempLink.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(tempLink)
    setIsLoading(false)
  }

  return (
    <section>
      {hasPassword && 
        <div className="DownloadFile__password">
          <span>Please enter the password to download the file</span>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        </div>
      }
      <button className="DownloadFile__field" onClick={handleClick}>
        {isLoading ? <PiSpinnerBold className="DownloadFile__spinner" size={100}/> :
          <div>
            
            {statusCode === 401 && 
              <span className="DownloadFile__info" style={{"background": "#e57373"}}>Wrong Password</span>
            }
            
            {statusCode === 500 && 
              <span className="DownloadFile__info" style={{"background": "#e57373"}}>Something Went Wrong</span>
            }
            
            {statusCode === 200 && 
              <span className="DownloadFile__info" style={{"background": "#81c784"}}>Here we go!</span>
            }
            
            <span>{filename}</span>
            <MdDownloading className="DownloadFile__icon" size={100}/>
            <h5>Click here to download</h5>
          </div>
        }
      </button>  
    </section>
  )
}

export default DownloadPage
