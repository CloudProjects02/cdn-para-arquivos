# MinhaCDN

Uma aplicação web para armazenamento e gerenciamento de arquivos, com backend em Node.js e frontend em React.

## Funcionalidades

- Upload de arquivos
- Listagem de arquivos
- Download de arquivos
- Exclusão de arquivos
- URLs compartilháveis para os arquivos

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- **Backend**: API RESTful construída com Node.js, Express e Multer
- **Frontend**: Interface de usuário construída com React

## Requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)

## Instalação

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Configuração

O backend utiliza um arquivo `.env` para configurações. Um exemplo já está incluído com as configurações padrão.

## Execução

### Backend

```bash
cd backend
npm run dev
```

O servidor backend será iniciado na porta 5000 (ou na porta definida no arquivo .env).

### Frontend

```bash
cd frontend
npm start
```

A aplicação frontend será iniciada na porta 3000.

## Uso

Após iniciar tanto o backend quanto o frontend, acesse a aplicação em [http://localhost:3000](http://localhost:3000).

- **Página Inicial**: Apresenta uma visão geral da aplicação
- **Enviar Arquivo**: Permite fazer upload de arquivos para o servidor
- **Meus Arquivos**: Lista todos os arquivos enviados, com opções para download, copiar URL e excluir

## Estrutura de Arquivos

```
/
├── backend/
│   ├── uploads/       # Pasta onde os arquivos são armazenados
│   ├── index.js       # Ponto de entrada do servidor
│   ├── package.json   # Dependências do backend
│   └── .env           # Configurações do ambiente
│
└── frontend/
    ├── public/        # Arquivos estáticos
    ├── src/           # Código fonte do frontend
    │   ├── components/# Componentes React reutilizáveis
    │   ├── pages/     # Páginas da aplicação
    │   ├── App.js     # Componente principal
    │   └── index.js   # Ponto de entrada do frontend
    └── package.json   # Dependências do frontend
``` 