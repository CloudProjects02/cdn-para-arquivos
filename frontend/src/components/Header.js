import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo">
          MinhaCDN
        </NavLink>
        <nav>
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Início
            </NavLink>
            <NavLink to="/upload" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Enviar Arquivo
            </NavLink>
            <NavLink to="/files" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Meus Arquivos
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 