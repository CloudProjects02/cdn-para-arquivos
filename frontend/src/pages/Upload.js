import React, { useState, useRef } from 'react';
import { FiUpload } from 'react-icons/fi';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage({ type: '', text: '' });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setMessage({ type: '', text: '' });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage({ type: 'danger', text: 'Por favor, selecione um arquivo para enviar.' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setProgress(0);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });

      setUploadedFile(response.data.file);
      setMessage({ type: 'success', text: 'Arquivo enviado com sucesso!' });
      setFile(null);
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.error || 'Erro ao enviar o arquivo. Por favor, tente novamente.' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Enviar Arquivo</h1>
      
      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div 
            className="upload-area" 
            onDragOver={handleDragOver} 
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <FiUpload className="upload-icon" />
            <p className="upload-text">
              {file ? file.name : 'Arraste e solte um arquivo aqui ou clique para selecionar'}
            </p>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
            />
          </div>
          
          {uploading && (
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn" 
            disabled={uploading || !file}
            style={{ marginTop: '10px' }}
          >
            {uploading ? 'A enviar...' : 'Enviar Arquivo'}
          </button>
        </form>
      </div>
      
      {uploadedFile && (
        <div className="card" style={{ marginTop: '20px' }}>
          <h2>Arquivo Enviado</h2>
          <p><strong>Nome:</strong> {uploadedFile.originalname}</p>
          <p><strong>Tamanho:</strong> {(uploadedFile.size / 1024).toFixed(2)} KB</p>
          <p><strong>URL:</strong> <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer">{uploadedFile.url}</a></p>
          <div style={{ marginTop: '10px' }}>
            <button 
              className="btn" 
              onClick={() => {
                navigator.clipboard.writeText(uploadedFile.url);
                setMessage({ type: 'success', text: 'URL copiada para a área de transferência!' });
              }}
            >
              Copiar URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload; 