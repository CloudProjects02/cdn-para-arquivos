import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiDownload, FiTrash2, FiCopy } from 'react-icons/fi';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/files');
      setFiles(response.data.files);
      setError('');
    } catch (error) {
      console.error('Erro ao buscar arquivos:', error);
      setError('Não foi possível carregar os arquivos. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async (filename) => {
    if (window.confirm('Tem certeza que deseja excluir este arquivo?')) {
      try {
        await axios.delete(`http://localhost:5000/api/files/${filename}`);
        setMessage({ type: 'success', text: 'Arquivo excluído com sucesso!' });
        fetchFiles(); // Atualizar a lista após excluir
      } catch (error) {
        console.error('Erro ao excluir arquivo:', error);
        setMessage({ 
          type: 'danger', 
          text: 'Erro ao excluir o arquivo. Por favor, tente novamente.' 
        });
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB';
    else return (bytes / 1073741824).toFixed(2) + ' GB';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT') + ' ' + date.toLocaleTimeString('pt-PT');
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setMessage({ type: 'success', text: 'URL copiada para a área de transferência!' });
  };

  return (
    <div>
      <h1 className="page-title">Meus Arquivos</h1>
      
      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}
      
      {loading ? (
        <div className="card">
          <p>A carregar arquivos...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">
          {error}
        </div>
      ) : files.length === 0 ? (
        <div className="card">
          <p>Nenhum arquivo encontrado. Faça upload de arquivos para vê-los aqui.</p>
        </div>
      ) : (
        <div className="file-list">
          {files.map((file) => (
            <div key={file.filename} className="file-card">
              <h3 className="file-name">{file.filename}</h3>
              <div className="file-info">
                <p>Tamanho: {formatFileSize(file.size)}</p>
                <p>Data: {formatDate(file.createdAt)}</p>
              </div>
              <div className="file-actions">
                <a 
                  href={file.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn"
                  title="Download"
                >
                  <FiDownload />
                </a>
                <button 
                  className="btn" 
                  onClick={() => copyToClipboard(file.url)}
                  title="Copiar URL"
                >
                  <FiCopy />
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(file.filename)}
                  title="Excluir"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList; 