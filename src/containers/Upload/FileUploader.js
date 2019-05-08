import React, {useEffect, useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Loader from '../../components/Loader'
import {toast} from 'react-toastify'
import {upload_url_firebase} from '../../config'
import request from 'superagent'

export default function MyDropzone() {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)
  const onDrop = useCallback(files => {
    //console.log(acceptedFiles[0]);
    setLoading(true)
    let req = request.post(upload_url_firebase)

    files.forEach(file => {
      req.attach(file.name, file)
    })

    req
      .then(c => {
        //setCsvData(JSON.parse(c.text))
        setLoading(false)
        if (!c.body.error) {
          toast.success(c.body.msg, {
            position: toast.POSITION.TOP_RIGHT,
          })
          setMsg('Successfully Uploaded! ')
          window.location.reload();
        } else {
          toast.success('Please Wait! We are uploading.', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setMsg('Successfully Uploaded! ')
          window.location.reload();
        }
      })
      .catch(e => {
        //console.log(e)
        setLoading(false)
        toast.success('Please Wait! We are uploading.', {
          position: toast.POSITION.TOP_RIGHT,
        })
        setMsg('Successfully Uploaded! ')
        window.location.reload();
      })
    //req.end();
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <div>
      <div>{msg && <div>{msg}</div>}</div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div {...getRootProps()}>
            <input {...getInputProps()} type="file" name="csv" />
            {isDragActive ? (
              <p className="hand">Drop the file here ...</p>
            ) : (
              <p className="hand">Drag 'n' drop some file here, or click to select csv/xlsx file</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

{
  /*
  return (
    <form
      id='uploadForm' 
      action='https://fabio-real-state-lockround.c9users.io:8081/upload' 
      method='post' 
      encType="multipart/form-data">
        <input type="file" name="sampleFile" />
        <input type='submit' value='Upload!' />
    </form>
    )
  
  */
}
