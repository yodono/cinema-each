-- TABELA: FILME
CREATE TABLE
  filme (
    id_filme SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    sinopse TEXT,
    duracao INT NOT NULL, -- em minutos
    classificacao_etaria VARCHAR(20),
    data_estreia DATE NOT NULL,
    data_fim_cartaz DATE
  );

-- TABELA: GENERO
CREATE TABLE
  genero (
    id_genero SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL
  );

-- TABELA: FILME_GENERO
CREATE TABLE
  filme_genero (
    id_filme INT NOT NULL REFERENCES filme (id_filme) ON DELETE CASCADE,
    id_genero INT NOT NULL REFERENCES genero (id_genero) ON DELETE CASCADE,
    PRIMARY KEY (id_filme, id_genero)
  );

-- TABELA: SALA
CREATE TABLE
  sala (
    id_sala SERIAL PRIMARY KEY,
    numero INT UNIQUE NOT NULL,
    capacidade INT NOT NULL,
    tipo VARCHAR(20) CHECK (tipo IN ('COMUM', 'VIP', 'IMAX')) NOT NULL
  );

-- TABELA: ASSENTO (entidade fraca)
-- Depende da sala
CREATE TABLE
  assento (
    id_assento SERIAL PRIMARY KEY,
    id_sala INT NOT NULL REFERENCES sala (id_sala) ON DELETE CASCADE,
    fileira CHAR(1) NOT NULL,
    numero INT NOT NULL,
    UNIQUE (id_sala, fileira, numero)
  );

-- TABELA: SESSAO (entidade fraca)
-- Depende de sala e filme
CREATE TABLE
  sessao (
    id_sessao SERIAL PRIMARY KEY,
    id_sala INT NOT NULL REFERENCES sala (id_sala) ON DELETE CASCADE,
    id_filme INT NOT NULL REFERENCES filme (id_filme) ON DELETE CASCADE,
    data DATE NOT NULL,
    horario TIME NOT NULL,
    tipo_exibicao VARCHAR(20) CHECK (tipo_exibicao IN ('NORMAL', '3D', 'IMAX')) NOT NULL,
    tipo_audio VARCHAR(20) CHECK (tipo_audio IN ('DUBLADO', 'LEGENDADO')) NOT NULL,
    UNIQUE (id_sala, id_filme, data, horario)
  );

-- TABELA: DIRETOR
CREATE TABLE
  diretor (
    id_diretor SERIAL PRIMARY KEY,
    nome VARCHAR(25) NOT NULL
  );

-- TABELA: DIRIGE_FILME
CREATE TABLE
  dirige_filme (
    id_diretor INT NOT NULL REFERENCES diretor (id_diretor) ON DELETE CASCADE,
    id_filme INT NOT NULL REFERENCES filme (id_filme) ON DELETE CASCADE,
    PRIMARY KEY (id_filme, id_diretor)
  );

-- TABELA: ATOR
CREATE TABLE
  ator (
    id_ator SERIAL PRIMARY KEY,
    nome VARCHAR(25) NOT NULL
  );

-- TABELA: ATUA_EM (Relacionamento entre ator e filme: um ator pode atuar em vários filmes e um filme pode ter vários atores)
CREATE TABLE
  atua_em (
    id_filme INT REFERENCES filme (id_filme) ON DELETE CASCADE,
    id_ator INT REFERENCES ator (id_ator) ON DELETE CASCADE,
    PRIMARY KEY (id_filme, id_ator)
  );

-- === PRODUTO === ---
-- TABELA: PRODUTO (superclasse)
CREATE TABLE
  produto (
    id_produto SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    preco_base NUMERIC(10, 2) NOT NULL CHECK (preco_base >= 0),
    pontos_ganhos INT DEFAULT 0,
    pontos_necessarios INT DEFAULT 0
  );

-- TABELA: COLECIONÁVEL (especialização)
CREATE TABLE
  colecionavel (
    id_produto INT PRIMARY KEY REFERENCES produto (id_produto) ON DELETE CASCADE,
    id_filme INT REFERENCES filme (id_filme) ON DELETE SET NULL,
    nome VARCHAR(100) NOT NULL
  );

-- TABELA: SNACK (especialização)
CREATE TABLE
  snack (
    id_produto INT PRIMARY KEY REFERENCES produto (id_produto) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    tamanho VARCHAR(20) CHECK (
      tamanho IN ('PEQUENO', 'MÉDIO', 'GRANDE', 'UNITÁRIO')
    ) NOT NULL
  );

-- TABELA: INGRESSO (especialização)
CREATE TABLE
  ingresso (
    id_produto INT REFERENCES produto (id_produto) ON DELETE CASCADE,
    id_sessao INT NOT NULL REFERENCES sessao (id_sessao) ON DELETE CASCADE,
    id_assento INT NOT NULL REFERENCES assento (id_assento) ON DELETE CASCADE,
    tipo VARCHAR(20) CHECK (tipo IN ('INTEIRA', 'MEIA')) NOT NULL,
    PRIMARY KEY (id_sessao, id_assento)
  );

-- === FIM PRODUTO === ---
-- TABELA: CLIENTE
CREATE TABLE
  cliente (
    id_cliente SERIAL PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    pontos_acumulados INT DEFAULT 0 CHECK (pontos_acumulados >= 0)
  );

-- TABELA: COMPRA (entidade fraca)
CREATE TABLE
  compra (
    id_compra SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES cliente (id_cliente) ON DELETE CASCADE,
    data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- RELAÇÃO ENTRE COMPRA E PRODUTOS
-- (Cada compra contém vários produtos)
CREATE TABLE
  compra_produto (
    id_compra INT REFERENCES compra (id_compra) ON DELETE CASCADE,
    id_produto INT REFERENCES produto (id_produto) ON DELETE CASCADE,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    forma_pagamento VARCHAR(30) CHECK (
      forma_pagamento IN ('DÉBITO', 'CRÉDITO', 'PIX', 'FIDELIDADE')
    ) NOT NULL,
    pontos_utilizados INT DEFAULT 0,
    pontos_ganhos INT DEFAULT 0,
    PRIMARY KEY (id_compra, id_produto)
  );

-- TABELA: PONTUACAO
CREATE TABLE
  pontuacao (
    id_pontuacao SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL REFERENCES cliente (id_cliente) ON DELETE CASCADE,
    id_compra INT REFERENCES compra (id_compra) ON DELETE SET NULL,
    tipo VARCHAR(10) CHECK (tipo IN ('GANHO', 'USO')) NOT NULL,
    valor INT NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- TABELA: RESGATE
CREATE TABLE
  resgate (
    id_resgate SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL REFERENCES cliente (id_cliente) ON DELETE CASCADE,
    id_produto INT NOT NULL REFERENCES produto (id_produto) ON DELETE RESTRICT,
    pontos_utilizados INT NOT NULL CHECK (pontos_utilizados > 0),
    data_resgate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );