# Atlas CRM

O **Atlas CRM** é um sistema de gestão de relacionamento com clientes (CRM) desenvolvido para atender operações de **grandes varejistas**, centralizando o gerenciamento de clientes, produtos, vendas e indicadores em uma única plataforma.

O projeto é dividido em dois módulos:

* **atlas-crm-front** — Interface web desenvolvida em React.
* **atlas-crm-api** — API REST desenvolvida com NestJS e MySQL.

## Estrutura do projeto

```text
.
├── atlas-crm-front/
├── atlas-crm-api/
└── uploads/
```

## Tecnologias

### Frontend

* React
* TypeScript
* Vite
* Axios
* React Router
* Recharts

### Backend

* NestJS
* TypeORM
* MySQL
* JWT
* Bcrypt

## Requisitos

* Node.js 20+
* npm 10+
* MySQL

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

DATABASE_HOST=0.0.0.0
DATABASE_PORT=3306
DATABASE_NAME=atlascrm
DATABASE_USERNAME=root
DATABASE_PASSWORD=root

SECRET_JWT=sua_chave_jwt
SERVER_API_KEY=sua_api_key

VITE_API_URL=http://localhost:3000
VITE_SERVER_API_KEY=sua_api_key
```

## Instalação

### Linux/macOS

```bash
./install.sh
```

### Windows

```bat
install.bat
```

## Executando o projeto

### Backend

```bash
cd atlas-crm-api
npm run start:dev
```

### Frontend

```bash
cd atlas-crm-front
npm run dev
```

## Funcionalidades

* Autenticação com JWT
* Dashboard
* Gestão de clientes
* Gestão de produtos
* Gestão de vendas
* Relatórios
* Upload de imagens de produtos
* Notificações

## Estrutura das rotas

### Frontend

* `/`
* `/dashboard`
* `/products`
* `/customers`
* `/sales`

### Backend

* `/auth`
* `/products`
* `/customers`
* `/sales`
* `/notifications`

## Scripts principais

### Frontend

```bash
npm run dev
npm run build
npm run lint
```

### Backend

```bash
npm run start:dev
npm run build
npm run test
npm run lint
```
