import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Bem-vindo à MinhaCDN</h1>
      <p className="home-subtitle">
        Uma solução simples e eficiente para armazenar e compartilhar seus arquivos.
      </p>
      <div className="home-buttons">
        <Link to="/upload" className="btn">
          Enviar Arquivo
        </Link>
        <Link to="/files" className="btn">
          Ver Meus Arquivos
        </Link>
      </div>
      <div className="card" style={{ marginTop: '40px', maxWidth: '800px', margin: '40px auto 0' }}>
        <h2>Sobre a MinhaCDN</h2>
        <p style={{ marginTop: '10px' }}>
          A MinhaCDN é uma plataforma de armazenamento de arquivos que permite que você faça upload, 
          gerencie e compartilhe seus arquivos de forma fácil e segura. Com uma interface intuitiva 
          e recursos poderosos, a MinhaCDN é a solução perfeita para suas necessidades de armazenamento.
        </p>
        <h3 style={{ marginTop: '20px' }}>Recursos</h3>
        <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
          <li>Upload de arquivos simples e rápido</li>
          <li>Gerenciamento fácil de arquivos</li>
          <li>URLs compartilháveis para seus arquivos</li>
          <li>Interface amigável e responsiva</li>
        </ul>
      </div>
    </div>
  );
};

export default Home; 