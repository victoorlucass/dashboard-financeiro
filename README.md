# 💰 Dashboard Financeiro

Aplicação web para controle e acompanhamento financeiro, permitindo registrar receitas e despesas, visualizar o saldo e acompanhar a evolução financeira por meio de gráficos e indicadores mensais.

O projeto foi desenvolvido com **Spring Boot** no backend e **React + TypeScript** no frontend, utilizando PostgreSQL para persistência dos dados.

## 🚀 Funcionalidades

- Cadastro, edição e exclusão de receitas.
- Cadastro, edição e exclusão de despesas.
- Consulta do saldo financeiro.
- Resumo financeiro mensal.
- Consulta de movimentações por período.
- Histórico financeiro anual.
- Gráfico de receitas, despesas e saldo mensal.
- Filtros por tipo, categoria e período.
- Validação de dados nos formulários.

## 🛠️ Tecnologias utilizadas

### Backend
- Java 25
- Spring Boot 4.1.1
- Spring Data JPA
- Hibernate
- Maven
- PostgreSQL

### Frontend
- React
- TypeScript
- Vite
- Recharts
- Lucide React
- CSS

## 📁 Estrutura do projeto

```text
dashboard-financeiro-repo/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Como executar o projeto

### Pré-requisitos

- Java 25 ou compatível com a versão utilizada no projeto.
- Node.js e npm.
- PostgreSQL.
- Git.

### 1. Configuração do banco de dados

Crie um banco de dados PostgreSQL com o nome:

```sql
CREATE DATABASE dashboard_financeiro;
```

### 2. Configuração do backend

Acesse a pasta:

```bash
cd backend
```

Configure as seguintes variáveis de ambiente antes de iniciar a aplicação:

| Variável | Exemplo |
|---|---|
| `DB_URL` | `jdbc:postgresql://localhost:5432/dashboard_financeiro` |
| `DB_USERNAME` | Seu usuário PostgreSQL |
| `DB_PASSWORD` | Sua senha PostgreSQL |

No PowerShell, você pode configurá-las assim:

```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/dashboard_financeiro"
$env:DB_USERNAME="seu_usuario"
$env:DB_PASSWORD="sua_senha"
```

Inicie o backend:

```powershell
.\mvnw spring-boot:run
```

A API estará disponível em:

```text
http://localhost:8080
```

### 3. Configuração do frontend

Em outro terminal, acesse:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm run dev
```

O frontend estará disponível em:

```text
http://localhost:5173
```

## 🔌 Principais endpoints

### Receitas

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/receitas` | Lista todas as receitas |
| GET | `/receitas/{id}` | Busca uma receita por ID |
| POST | `/receitas` | Cadastra uma nova receita |
| PUT | `/receitas/{id}` | Atualiza uma receita existente |
| DELETE | `/receitas/{id}` | Exclui uma receita |

### Despesas

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/despesas` | Lista todas as despesas |
| GET | `/despesas/{id}` | Busca uma despesa por ID |
| POST | `/despesas` | Cadastra uma nova despesa |
| PUT | `/despesas/{id}` | Atualiza uma despesa existente |
| DELETE | `/despesas/{id}` | Exclui uma despesa |

### Resumo financeiro

| Método | Endpoint | Parâmetros | Descrição |
|---|---|---|---|
| GET | `/resumo-financeiro` | — | Consulta o resumo financeiro geral |
| GET | `/resumo-financeiro/periodo` | `dataInicio`, `dataFim` | Consulta o resumo por período |
| GET | `/resumo-financeiro/mensal` | `mes`, `ano` | Consulta o resumo de determinado mês |
| GET | `/resumo-financeiro/historico` | `ano` | Consulta o histórico financeiro anual |

## 🧮 Cálculo financeiro

O saldo é calculado pela diferença entre o total de receitas e o total de despesas:

```text
Saldo = Total de Receitas - Total de Despesas
```

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido com o objetivo de praticar e consolidar conhecimentos em desenvolvimento Full Stack, integração entre frontend e backend, criação de APIs REST, persistência de dados e construção de interfaces interativas.

Também faz parte da construção de um portfólio pessoal de desenvolvimento.

## 👨‍💻 Autor

Desenvolvido por **Victor Lucas**.