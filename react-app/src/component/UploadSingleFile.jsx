
import React, { useState } from 'react';

const FileUploader = () => {
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    try {
      setStatus('Uploading ... &#10227;');
      const fileObj = new FormData();
      fileObj.append('data', file);

      const response = await fetch('/server/service_handling_function/uploadfile', {
        method: 'POST',
        body: fileObj,
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log(data.id)
      }
    } catch (e) {
      console.log(e);
      alert('Error. Please try again after sometime.');
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" id="customFile" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload File</button>
      <p id="status">{status}</p>
    </div>
  );
};

export default FileUploader;