-- RESET
TRUNCATE compra_produto, compra, ingresso, snack, colecionavel, produto, sessao, assento, sala, filme_genero, genero, filme RESTART IDENTITY CASCADE;

-- GÊNEROS
INSERT INTO genero (nome) VALUES
    ('Animação'), ('Fantasia'), ('Aventura'), ('Drama'), ('Comédia'),
    ('Família'), ('Crime'), ('Thriller'), ('Romance'), ('Ficção');

-- FILMES
INSERT INTO filme (titulo, sinopse, duracao, classificacao_etaria, data_estreia, data_fim_cartaz)
VALUES
    ('A Viagem de Chihiro', 'Uma garota entra em um mundo mágico de espíritos e precisa resgatar seus pais.', 125, 'L', '2025-11-05', '2025-12-15'),
    ('O Mundo dos Pequeninos', 'Arrietty vive escondida embaixo do assoalho de uma casa e descobre a amizade com um humano.', 94, 'L', '2025-10-20', '2025-11-30'),
    ('A Casa Monstro', 'Três amigos descobrem que a casa do vizinho é viva e assustadora.', 91, '10', '2025-10-31', '2025-12-01'),
    ('O Serviço de Entregas da Kiki', 'Uma jovem bruxa inicia sua independência trabalhando com entregas.', 103, 'L', '2025-11-10', '2026-01-01'),
    ('O Fantástico Sr. Raposo', 'Um raposo tenta deixar a vida de ladrão, mas enfrenta novos desafios.', 87, 'L', '2025-09-15', '2025-11-10'),
    ('Ilha dos Cachorros', 'Garoto vai em busca de seu cão em uma ilha repleta de cães exilados.', 101, '12', '2025-11-02', '2026-01-02'),
    ('Submarine', 'Um adolescente tenta salvar o casamento dos pais enquanto inicia seu primeiro romance.', 97, '14', '2025-08-15', '2025-10-01'),
    ('Drive', 'Um dublê e motorista de fuga se envolve com criminosos perigosos.', 100, '16', '2025-11-01', '2026-01-15'),
    ('Taxi Driver', 'Um veterano de guerra vira taxista e enfrenta a decadência moral da cidade.', 114, '18', '2025-09-10', '2025-11-10'),
    ('Meu Amigo Totoro', 'Duas irmãs se mudam para o campo e conhecem seres mágicos na floresta.', 86, 'L', '2025-11-03', '2025-12-20');

-- FILME_GENERO
INSERT INTO filme_genero (id_filme, id_genero)
VALUES
    (1,1),(1,2),(1,3),
    (2,1),(2,6),(2,2),
    (3,1),(3,5),(3,8),
    (4,1),(4,3),(4,6),
    (5,1),(5,5),(5,4),
    (6,1),(6,4),(6,2),
    (7,4),(7,8),
    (8,7),(8,8),
    (9,7),(9,8),
    (10,1),(10,2),(10,6);

-- DIRETOR
    INSERT INTO diretor(nome) VALUES
    ('Hayao Miyazaki'),    -- 1 (Chihiro, Kiki, Totoro)
    ('Hiromasa Yonebayashi'), -- 2 (Pequeninos)
    ('Gil Kenan'),         -- 3 (Casa Monstro)
    ('Wes Anderson'),      -- 4 (Sr. Raposo, Ilha dos Cachorros)
    ('Richard Ayoade'),    -- 5 (Submarine)
    ('Nicolas Winding Refn'), -- 6 (Drive)
    ('Martin Scorsese'),   -- 7 (Taxi Driver)
    ('Denis Villeneuve'),  -- 8 (Duna 2)
    ('Julius Avery');      -- 9 (O Exorcista do Papa)


-- DIRIGE_FILME
INSERT INTO dirige_filme(id_diretor, id_filme)
VALUES
    (1, 1), (2, 2), (3, 3), (1, 4), (4, 5), (4, 6),
    (5, 7), (6, 8), (7, 9), (1, 10), (8, 11), (9, 12);

-- ATORES 
INSERT INTO ator(nome) VALUES
    ('Ryan Gosling'),      -- 1 (Drive)
    ('Robert De Niro'),    -- 2 (Taxi Driver)
    ('Timothée Chalamet'), -- 3 (Duna 2)
    ('Florence Pugh'),     -- 4 (Duna 2)
    ('Russell Crowe'),     -- 5 (O Exorcista do Papa)
    ('Craig Roberts');     -- 6 (Submarine)

-- ATUA_EM 
INSERT INTO atua_em(id_filme, id_ator)
VALUES
    (8, 1), (9, 2), (11, 3), (11, 4), (12, 5), (7, 6);    

-- SALAS
INSERT INTO sala (numero, capacidade, tipo) VALUES
    (1, 60, 'COMUM'),
    (2, 40, 'VIP'),
    (3, 100, 'IMAX');

-- ASSENTOS (simplificado)
-- Sala 1
INSERT INTO assento (id_sala, fileira, numero)
SELECT 1, chr(65 + i/10), (i % 10) + 1 FROM generate_series(0, 59) s(i);
-- Sala 2
INSERT INTO assento (id_sala, fileira, numero)
SELECT 2, chr(65 + i/8), (i % 8) + 1 FROM generate_series(0, 39) s(i);
-- Sala 3
INSERT INTO assento (id_sala, fileira, numero)
SELECT 3, chr(65 + i/10), (i % 10) + 1 FROM generate_series(0, 99) s(i);

-- SESSÕES
INSERT INTO sessao (id_sala, id_filme, data, horario, tipo_exibicao, tipo_audio)
VALUES
    (1, 1, '2025-11-05', '19:00', 'NORMAL', 'LEGENDADO'),
    (2, 2, '2025-11-06', '20:30', '3D', 'DUBLADO'),
    (3, 3, '2025-11-03', '18:00', 'IMAX', 'LEGENDADO'),
    (1, 4, '2025-11-12', '16:00', 'NORMAL', 'DUBLADO'),
    (2, 5, '2025-10-01', '21:00', 'NORMAL', 'LEGENDADO'),
    (3, 6, '2025-11-02', '17:30', 'IMAX', 'LEGENDADO'),
    (1, 7, '2025-09-10', '20:00', 'NORMAL', 'LEGENDADO'),
    (2, 8, '2025-11-01', '22:00', 'IMAX', 'LEGENDADO'),
    (3, 9, '2025-09-12', '19:30', 'NORMAL', 'LEGENDADO'),
    (1,10, '2025-11-04', '15:00', 'NORMAL', 'DUBLADO');

-- PRODUTOS (ingressos + colecionáveis)

-- Ingressos
INSERT INTO produto (sku, preco_base, pontos_ganhos)
VALUES
    ('ING1', 30.00, 3), ('ING2', 15.00, 1),
    ('ING3', 30.00, 3), ('ING4', 15.00, 1),
    ('ING5', 30.00, 3), ('ING6', 15.00, 1),
    ('ING7', 30.00, 3), ('ING8', 15.00, 1),
    ('ING9', 30.00, 3), ('ING10', 15.00, 1);

-- Relacionar com ingressos (assentos específicos)
INSERT INTO ingresso (id_produto, id_sessao, id_assento, tipo)
VALUES
    (1, 1, 1, 'INTEIRA'),
    (2, 1, 2, 'MEIA'),
    (3, 2, 3, 'INTEIRA'),
    (4, 3, 4, 'MEIA'),
    (5, 4, 5, 'INTEIRA'),
    (6, 5, 6, 'MEIA'),
    (7, 6, 7, 'INTEIRA'),
    (8, 7, 8, 'INTEIRA'),
    (9, 8, 9, 'MEIA'),
    (10, 9, 10, 'INTEIRA');

-- Colecionáveis
INSERT INTO produto (sku, preco_base, pontos_ganhos)
VALUES
    ('COL1', 80.00, 8), ('COL2', 75.00, 8), ('COL3', 70.00, 7),
    ('COL4', 65.00, 6), ('COL5', 60.00, 6), ('COL6', 55.00, 5),
    ('COL7', 50.00, 5), ('COL8', 90.00, 9), ('COL9', 85.00, 8), ('COL10', 95.00, 10);

INSERT INTO colecionavel (id_produto, id_filme, nome)
VALUES
    (11, 1, 'Miniatura Chihiro e Haku'),
    (12, 2, 'Boneca Arrietty'),
    (13, 3, 'Casa Monstro 3D'),
    (14, 4, 'Kiki com vassoura'),
    (15, 5, 'Sr. Raposo em cerâmica'),
    (16, 6, 'Poster Ilha dos Cachorros'),
    (17, 7, 'Diário do Oliver (Submarine)'),
    (18, 8, 'Jaqueta do Driver'),
    (19, 9, 'Taxi Amarelo em Metal'),
    (20,10,'Totoro de pelúcia');

-- COMPRAS
INSERT INTO compra (id_cliente, data_compra)
VALUES
    (1, '2025-11-01 18:00:00'),
    (2, '2025-11-02 19:00:00'),
    (3, '2025-11-03 20:00:00'),
    (4, '2025-11-04 21:00:00'),
    (5, '2025-11-05 22:00:00');

INSERT INTO compra_produto (id_compra, id_produto, quantidade, forma_pagamento)
VALUES
    (1, 1, 1, 'CRÉDITO'),
    (1,11,1,'CRÉDITO'),
    (2, 2, 1, 'PIX'),
    (3, 3, 2, 'DÉBITO'),
    (4, 4, 1, 'CRÉDITO'),
    (5, 8, 1, 'CRÉDITO'),
    (5,20,1,'PIX');
