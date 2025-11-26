# 🎬 Cinema Each - Sistema de Gerenciamento
Sistema desenvolvido em Java e React para gerenciamento de cinema.

## 🌐 Acesso ao Projeto

O projeto está **publicado e disponível** online no seguinte endereço:

> https://main.d1gb9y86b3nwya.amplifyapp.com/

---

## 💻 Execução Local

Para rodar a aplicação localmente, siga as instruções abaixo, utilizando o **Docker Compose** para orquestrar todos os serviços.

### 📋 Pré-requisitos

Você deve ter as seguintes ferramentas instaladas em sua máquina:

* **Git**: Para clonagem do repositório.
    * [Instalar Git](https://git-scm.com)
* **Docker Desktop**: Para gerenciar os containers (Frontend, Backend e Banco de Dados).
    * [Instalar Docker Desktop](https://www.docker.com/products/docker-desktop/)

### ⬇️ Clonagem e Setup Inicial

1.  **Clone o repositório** em sua máquina:

    ```bash
    git clone [https://github.com/yodono/cinema-each.git](https://github.com/yodono/cinema-each.git)
    ```

2.  **Navegue até o diretório raiz** do projeto (onde está o arquivo `docker-compose.yml`):

    ```bash
    cd cinema-each
    ```

### 🚀 Rodando a Aplicação com Docker

1.  **Inicie os serviços**:
    Execute o comando para construir (se necessário), baixar as imagens e rodar todos os containers em *modo detached* (`-d`):

    ```bash
    docker compose up -d
    ```

    > ⏳ **Aguarde**: O Docker irá baixar as imagens necessárias (db, pgadmin, backend e frontend) e iniciar os processos.

---

### 🗄️ Configuração do Banco de Dados (PostgreSQL)

É necessário configurar o schema e popular o banco de dados via pgAdmin.

1.  **Acesse o pgAdmin**:
    Abra seu navegador e acesse a interface de administração:

    > **URL**: `localhost:5050`

2.  **Faça o Login**:
    Utilize as credenciais:
    * **Usuário**: `admin@admin.com`
    * **Senha**: `admin`

3.  **Conecte-se ao Servidor do DB**:
    * Siga o caminho: **Servers > Register > Server...**
    * Preencha os dados de conexão do container do banco:
        * **Hostname/address**: `db` (Nome do serviço no `docker-compose.yml`)
        * **Port**: `5432`
        * **Username/Password**: Utilize as credenciais do PostgreSQL definidas no seu `docker-compose.yml`.

4.  **Execute os Scripts SQL**:
    Com a conexão estabelecida, utilize o *Query Tool* do pgAdmin para executar os scripts na ordem:
    * `schema.sql` (Criação das tabelas)
    * `seed.sql` (População inicial dos dados)

    Você pode encontrar os scripts aqui:
    > [backend/src/main/resources/database](https://github.com/yodono/cinema-each/tree/main/backend/src/main/resources/database)

5.  **Pronto!**: Finalizado o setup do banco, você pode fechar o pgAdmin.

---

### ✅ Teste a Aplicação

Com o banco de dados configurado, acesse o frontend para testar:

> **URL da Aplicação**: `localhost:3000`

### 🛑 Comandos Úteis do Docker Compose

| Comando | Descrição |
| :--- | :--- |
| `docker compose up -d` | Inicia os containers. |
| `docker compose down` | **Para e remove** todos os containers e a rede criada pelo projeto. |
| `docker compose up -d --build` | Inicia, **reconstruindo as imagens** do zero (útil após mudanças no código). |



