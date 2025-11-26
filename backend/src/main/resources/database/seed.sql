-- RESET
TRUNCATE compra_produto,
    compra,
    resgate,
    pontuacao,
    ingresso,
    snack,
    colecionavel,
    produto,
    sessao,
    assento,
    sala,
    dirige_filme,
    diretor,
    atua_em,
    ator,
    filme_genero,
    genero,
    filme,
    cliente RESTART IDENTITY CASCADE;

-- ===========================
-- GÊNEROS
-- ===========================

INSERT INTO genero (nome)
VALUES ('Animação'),
       ('Fantasia'),
       ('Aventura'),
       ('Drama'),
       ('Comédia'),
       ('Família'),
       ('Crime'),
       ('Thriller'),
       ('Romance'),
       ('Ficção');

-- ===========================
-- FILMES (20)
-- ===========================

INSERT INTO filme (titulo, sinopse, duracao, classificacao_etaria, data_estreia, data_fim_cartaz)
VALUES ('Ainda Estou Aqui','Rio de Janeiro, 1971. Eunice Paiva é forçada a se reinventar quando sua família sofre um ato violento do estado brasileiro.',110,'14','2025-09-20','2025-11-20'),
       ('Kill Bill Vol 1','Noiva busca vingança contra antigos companheiros.',111,'18','2025-08-01','2025-10-01'),
       ('Laranja Mecânica','Distopia violenta sobre livre-arbítrio e controle social.',136,'18','2025-07-10','2025-09-01'),
       ('Saneamento Básico (o filme)','Comédia dramática sobre um pequeno povoado e suas soluções criativas.',98,'12','2025-10-05','2025-12-05'),
       ('Blade Runner: O Caçador de Androides','Um caçador de replicantes enfrenta questões sobre humanidade.',117,'16','2025-11-15','2026-01-15'),
       ('Click','Comédia dramática onde controle remoto altera a vida de um homem.',107,'12','2025-06-01','2025-08-01'),
       ('Shrek','Animação sobre um ogro que vai a uma missão para salvar uma princesa.',90,'L','2025-05-10','2025-07-10'),
       ('Gato de Botas 2','Continuação das aventuras do Gato de Botas.',102,'10','2025-11-25','2026-01-25'),
       ('Toy Story 1','Brinquedos ganham vida quando humanos não estão por perto.',81,'L','2025-04-01','2025-06-01'),
       ('Taxi de Nova Iorque','Comédia dramática ambientada nas ruas de Nova Iorque.',95,'14','2025-07-20','2025-09-20'),
       ('A Viagem de Chihiro','Uma garota entra em um mundo mágico de espíritos e precisa resgatar seus pais.',125,'L','2025-11-05','2025-12-15'),
       ('O Mundo dos Pequeninos','Arrietty vive escondida embaixo do assoalho de uma casa e descobre a amizade com um humano.',94,'L','2025-10-20','2025-11-30'),
       ('A Casa Monstro','Três amigos descobrem que a casa do vizinho é viva e assustadora.',91,'10','2025-10-31','2025-12-01'),
       ('O Serviço de Entregas da Kiki','Uma jovem bruxa inicia sua independência trabalhando com entregas.',103,'L','2025-11-10','2026-01-01'),
       ('O Fantástico Sr. Raposo','Um raposo tenta deixar a vida de ladrão, mas enfrenta novos desafios.',87,'L','2025-09-15','2025-11-10'),
       ('Ilha dos Cachorros','Garoto vai em busca de seu cão em uma ilha repleta de cães exilados.',101,'12','2025-11-02','2026-01-02'),
       ('Submarine','Um adolescente tenta salvar o casamento dos pais enquanto inicia seu primeiro romance.',97,'14','2025-08-15','2025-10-01'),
       ('Drive','Um dublê e motorista de fuga se envolve com criminosos perigosos.',100,'16','2025-11-01','2026-01-15'),
       ('Taxi Driver','Um veterano de guerra vira taxista e enfrenta a decadência moral da cidade.',114,'18','2025-09-10','2025-11-10'),
       ('Meu Amigo Totoro','Duas irmãs se mudam para o campo e conhecem seres mágicos na floresta.',86,'L','2025-11-03','2025-12-20');

-- ===========================
-- FILME_GENERO (mapeamento)
-- ===========================

INSERT INTO filme_genero (id_filme, id_genero)
VALUES (1,4),
       (2,7),
       (3,7),
       (3,8),
       (4,5),
       (4,4),
       (5,10),
       (5,7),
       (6,3),
       (6,4),
       (7,1),
       (7,5),
       (8,1),
       (8,3),
       (9,1),
       (9,6),
       (10,5),
       (10,4),
       (11,1),
       (11,2),
       (11,3),
       (12,1),
       (12,6),
       (13,5),
       (13,1),
       (14,2),
       (14,6),
       (15,5),
       (15,3),
       (16,3),
       (16,4),
       (17,4),
       (17,9),
       (18,7),
       (18,8),
       (19,7),
       (19,8),
       (20,1),
       (20,6);

-- ===========================
-- DIRETORES
-- ===========================

INSERT INTO diretor (nome)
VALUES ('Walter Salles'),
       ('Quentin Tarantino'),
       ('Stanley Kubrick'),
       ('Jorge Furtado'),
       ('Ridley Scott'),
       ('Frank Coraci'),
       ('Andrew Adamson'),
       ('Vicky Jenson'),
       ('Joel Crawford'),
       ('John Lasseter'),
       ('Tim Story'),
       ('Hayao Miyazaki'),
       ('Hiromasa Yonebayashi'),
       ('Gil Kenan'),
       ('Wes Anderson'),
       ('Richard Ayoade'),
       ('Nicolas Winding Refn'),
       ('Martin Scorsese');

-- DIRIGE_FILME (mapeamento)

INSERT INTO dirige_filme (id_diretor, id_filme)
VALUES ((SELECT id_diretor FROM diretor WHERE nome='Walter Salles'),1),
       ((SELECT id_diretor FROM diretor WHERE nome='Quentin Tarantino'),2),
       ((SELECT id_diretor FROM diretor WHERE nome='Stanley Kubrick'),3),
       ((SELECT id_diretor FROM diretor WHERE nome='Jorge Furtado'),4),
       ((SELECT id_diretor FROM diretor WHERE nome='Ridley Scott'),5),
       ((SELECT id_diretor FROM diretor WHERE nome='Frank Coraci'),6),
       ((SELECT id_diretor FROM diretor WHERE nome='Andrew Adamson'),7),
       ((SELECT id_diretor FROM diretor WHERE nome='Joel Crawford'),8),
       ((SELECT id_diretor FROM diretor WHERE nome='John Lasseter'),9),
       ((SELECT id_diretor FROM diretor WHERE nome='Tim Story'),10),
       ((SELECT id_diretor FROM diretor WHERE nome='Hayao Miyazaki'),11),
       ((SELECT id_diretor FROM diretor WHERE nome='Hiromasa Yonebayashi'),12),
       ((SELECT id_diretor FROM diretor WHERE nome='Gil Kenan'),13),
       ((SELECT id_diretor FROM diretor WHERE nome='Hayao Miyazaki'),14),
       ((SELECT id_diretor FROM diretor WHERE nome='Wes Anderson'),15),
       ((SELECT id_diretor FROM diretor WHERE nome='Wes Anderson'),16),
       ((SELECT id_diretor FROM diretor WHERE nome='Richard Ayoade') ,17),
       ((SELECT id_diretor FROM diretor WHERE nome='Nicolas Winding Refn') ,18),
       ((SELECT id_diretor FROM diretor WHERE nome='Martin Scorsese') ,19),
       ((SELECT id_diretor FROM diretor WHERE nome='Hayao Miyazaki') ,20);

-- ===========================
-- ATORES
-- ===========================

INSERT INTO ator (nome)
VALUES -- Ainda Estou Aqui / Saneamento Básico
       ('Fernanda Torres'),
       ('Valentina Herszage'),
       ('Selton Mello'),
       ('Wagner Moura'),
       ('Camila Pitanga'),
       -- Kill Bill
       ('Uma Thurman'),
       ('Lucy Liu'),
       ('David Carradine'),
       -- Laranja Mecânica
       ('Malcolm McDowell'),
       ('Patrick Magee'),
       ('Adrienne Corri'),
       -- Blade Runner
       ('Harrison Ford'),
       ('Rutger Hauer'),
       ('Sean Young'),
       -- Click
       ('Adam Sandler'),
       ('Kate Beckinsale'),
       ('Christopher Walken'),
       -- Shrek (ELENCO ORIGINAL, não BR)
       ('Mike Myers'),
       ('Eddie Murphy'),
       ('Cameron Diaz'),
       -- Gato de Botas 2 (ELENCO ORIGINAL, não BR)
       ('Antonio Banderas'),
       ('Salma Hayek'),
       ('Harvey Guillén'),
       -- Toy Story 1 (ELENCO ORIGINAL, não BR)
       ('Tom Hanks'),
       ('Tim Allen'),
       ('Don Rickles'),
       -- Taxi (Queen Latifah)
       ('Queen Latifah'),
       -- A Viagem de Chihiro (JP, apenas JP)
       ('Rumi Hiiragi'),
       ('Miyu Irino'),
       -- O Mundo dos Pequeninos (JP)
       ('Mirai Shida'),
       ('Ryunosuke Kamiki'),
       -- Serviço de Entregas da Kiki (JP)
       ('Minami Takayama'),
       ('Rei Sakuma'),
       -- Fantástico Sr. Raposo
       ('George Clooney'),
       ('Meryl Streep'),
       ('Jason Schwartzman'),
       -- Ilha dos Cachorros
       ('Bryan Cranston'),
       ('Edward Norton'),
       ('Bill Murray'),
       -- Submarine
       ('Craig Roberts'),
       ('Yasmin Paige'),
       ('Paddy Considine'),
       -- Drive
       ('Ryan Gosling'),
       ('Carey Mulligan'),
       ('Oscar Isaac'),
       -- Taxi Driver
       ('Robert De Niro'),
       ('Jodie Foster'),
       ('Harvey Keitel'),
       -- Meu Amigo Totoro (JP)
       ('Noriko Hidaka'),
       ('Chika Sakamoto');

-- ===========================
-- ATUA_EM (mapeamento atores → filmes)
-- ===========================
-- 1. Ainda Estou Aqui

INSERT INTO atua_em
VALUES (1, (SELECT id_ator FROM ator WHERE nome='Fernanda Torres')),
       (1, (SELECT id_ator FROM ator WHERE nome='Valentina Herszage')),
       (1, (SELECT id_ator FROM ator WHERE nome='Selton Mello'));

-- 2. Kill Bill Vol 1

INSERT INTO atua_em
VALUES (2, (SELECT id_ator FROM ator WHERE nome='Uma Thurman')),
       (2, (SELECT id_ator FROM ator WHERE nome='Lucy Liu')),
       (2, (SELECT id_ator FROM ator WHERE nome='David Carradine'));

-- 3. Laranja Mecânica

INSERT INTO atua_em
VALUES (3, (SELECT id_ator FROM ator WHERE nome='Malcolm McDowell')),
       (3, (SELECT id_ator FROM ator WHERE nome='Patrick Magee')),
       (3, (SELECT id_ator FROM ator WHERE nome='Adrienne Corri'));

-- 4. Saneamento Básico

INSERT INTO atua_em
VALUES (4, (SELECT id_ator FROM ator WHERE nome='Fernanda Torres')),
       (4, (SELECT id_ator FROM ator WHERE nome='Wagner Moura')),
       (4, (SELECT id_ator FROM ator WHERE nome='Camila Pitanga'));

-- 5. Blade Runner

INSERT INTO atua_em
VALUES (5, (SELECT id_ator FROM ator WHERE nome='Harrison Ford')),
       (5, (SELECT id_ator FROM ator WHERE nome='Rutger Hauer')),
       (5, (SELECT id_ator FROM ator WHERE nome='Sean Young'));

-- 6. Click

INSERT INTO atua_em
VALUES (6, (SELECT id_ator FROM ator WHERE nome='Adam Sandler')),
       (6, (SELECT id_ator FROM ator WHERE nome='Kate Beckinsale')),
       (6, (SELECT id_ator FROM ator WHERE nome='Christopher Walken'));

-- 7. Shrek (ELENCO ORIGINAL)

INSERT INTO atua_em
VALUES (7, (SELECT id_ator FROM ator WHERE nome='Mike Myers')),
       (7, (SELECT id_ator FROM ator WHERE nome='Eddie Murphy')),
       (7, (SELECT id_ator FROM ator WHERE nome='Cameron Diaz'));

-- 8. Gato de Botas 2

INSERT INTO atua_em
VALUES (8, (SELECT id_ator FROM ator WHERE nome='Antonio Banderas')),
       (8, (SELECT id_ator FROM ator WHERE nome='Salma Hayek')),
       (8, (SELECT id_ator FROM ator WHERE nome='Harvey Guillén'));

-- 9. Toy Story 1

INSERT INTO atua_em
VALUES (9, (SELECT id_ator FROM ator WHERE nome='Tom Hanks')),
       (9, (SELECT id_ator FROM ator WHERE nome='Tim Allen')),
       (9, (SELECT id_ator FROM ator WHERE nome='Don Rickles'));

-- 10. Taxi NY

INSERT INTO atua_em
VALUES (10, (SELECT id_ator FROM ator WHERE nome='Queen Latifah'));

-- 11. Chihiro (JP)

INSERT INTO atua_em
VALUES (11, (SELECT id_ator FROM ator WHERE nome='Rumi Hiiragi')),
       (11, (SELECT id_ator FROM ator WHERE nome='Miyu Irino'));

-- 12. O Mundo dos Pequeninos (JP)

INSERT INTO atua_em
VALUES (12, (SELECT id_ator FROM ator WHERE nome='Mirai Shida')),
       (12, (SELECT id_ator FROM ator WHERE nome='Ryunosuke Kamiki'));

-- 14. Kiki (JP)

INSERT INTO atua_em
VALUES (14, (SELECT id_ator FROM ator WHERE nome='Minami Takayama')),
       (14, (SELECT id_ator FROM ator WHERE nome='Rei Sakuma'));

-- 15. O Fantástico Sr. Raposo

INSERT INTO atua_em
VALUES (15, (SELECT id_ator FROM ator WHERE nome='George Clooney')),
       (15, (SELECT id_ator FROM ator WHERE nome='Meryl Streep')),
       (15, (SELECT id_ator FROM ator WHERE nome='Jason Schwartzman'));

-- 16. Ilha dos Cachorros

INSERT INTO atua_em
VALUES (16, (SELECT id_ator FROM ator WHERE nome='Bryan Cranston')),
       (16, (SELECT id_ator FROM ator WHERE nome='Edward Norton')),
       (16, (SELECT id_ator FROM ator WHERE nome='Bill Murray'));

-- 17. Submarine

INSERT INTO atua_em
VALUES (17, (SELECT id_ator FROM ator WHERE nome='Craig Roberts')),
       (17, (SELECT id_ator FROM ator WHERE nome='Yasmin Paige')),
       (17, (SELECT id_ator FROM ator WHERE nome='Paddy Considine'));

-- 18. Drive

INSERT INTO atua_em
VALUES (18, (SELECT id_ator FROM ator WHERE nome='Ryan Gosling')),
       (18, (SELECT id_ator FROM ator WHERE nome='Carey Mulligan')),
       (18, (SELECT id_ator FROM ator WHERE nome='Oscar Isaac'));

-- 19. Taxi Driver

INSERT INTO atua_em
VALUES (19, (SELECT id_ator FROM ator WHERE nome='Robert De Niro')),
       (19, (SELECT id_ator FROM ator WHERE nome='Jodie Foster')),
       (19, (SELECT id_ator FROM ator WHERE nome='Harvey Keitel'));

-- 20. Meu Amigo Totoro (JP)

INSERT INTO atua_em
VALUES (20, (SELECT id_ator FROM ator WHERE nome='Noriko Hidaka')),
       (20, (SELECT id_ator FROM ator WHERE nome='Chika Sakamoto'));

-- ===========================
-- SALAS (7) com capacidades somente 60, 80 ou 100
-- ===========================

INSERT INTO sala (numero, capacidade, tipo)
VALUES (1,80,'COMUM'),
       (2,80,'COMUM'),
       (3,80,'COMUM'),
       (4,100,'IMAX'),
       (5,100,'IMAX'),
       (6,60,'VIP'),
       (7,60,'VIP');

INSERT INTO assento (id_sala, fileira, numero)
SELECT 1, chr(65 + i/10), (i % 10) + 1 FROM generate_series(0, 79) s(i);
INSERT INTO assento (id_sala, fileira, numero)
SELECT 2, chr(65 + i/10), (i % 10) + 1 FROM generate_series(0, 79) s(i);
INSERT INTO assento (id_sala, fileira, numero)
SELECT 3, chr(65 + i/10), (i % 10) + 1 FROM generate_series(0, 79) s(i);
INSERT INTO assento (id_sala, fileira, numero)
SELECT 4, chr(65 + i/10), (i % 10) + 1 FROM generate_series(0, 99) s(i);
INSERT INTO assento (id_sala, fileira, numero)
SELECT 5, chr(65 + i/10), (i % 10) + 1 FROM generate_series(0, 99) s(i);
INSERT INTO assento (id_sala, fileira, numero)
SELECT 6, chr(65 + i/10), (i % 10) + 1 FROM generate_series(0, 59) s(i);
INSERT INTO assento (id_sala, fileira, numero)
SELECT 7, chr(65 + i/10), (i % 10) + 1 FROM generate_series(0, 59) s(i);

-- ===========================
-- PRODUTOS (INGRESSOS, SNACKS, COLECIONAVEIS)
-- ===========================
-- Ingressos (2 tipos)

INSERT INTO produto (sku, preco_base, pontos_ganhos, pontos_necessarios)
VALUES ('ING_REG', 30.00, 3, 5),
       ('ING_HALF', 15.00, 1, 0);

-- Snacks (4)
INSERT INTO produto (sku, preco_base, pontos_ganhos)
VALUES ('SNK_POPCS', 12.00, 1),
       ('SNK_POPCM', 12.00, 1),
       ('SNK_REF', 8.00, 0),
       ('SNK_NACHO', 16.00, 2);

INSERT INTO snack(id_produto, nome, tamanho) VALUES (1, 'Pipoca P', 'PEQUENO'),
                                                    (2, 'Pipoca M', 'MÉDIO'),
                                                    (3, 'Refrigerante', 'MÉDIO'),
                                                    (4, 'Nacho', 'UNITÁRIO');


-- Colecionáveis (10)

INSERT INTO produto (sku, preco_base, pontos_ganhos, pontos_necessarios)
VALUES ('COL_01', 80.00, 8, 500),
       ('COL_02', 75.00, 7, 450),
       ('COL_03', 70.00, 7, 400),
       ('COL_04', 65.00, 6, 350),
       ('COL_05', 60.00, 6, 300),
       ('COL_06', 55.00, 5, 250),
       ('COL_07', 50.00, 5, 200),
       ('COL_08', 90.00, 9, 600),
       ('COL_09', 85.00, 8, 550),
       ('COL_10', 95.00,10,700);

-- ===========================
-- COLECIONAVEIS (vincular a filmes)
-- ===========================

INSERT INTO colecionavel (id_produto, id_filme, nome)
VALUES ((SELECT id_produto FROM produto WHERE sku='COL_01'),1,'Ainda Estou Aqui - Poster Colecionável'),
       ((SELECT id_produto FROM produto WHERE sku='COL_02'),2,'Kill Bill - Mini Katana'),
       ((SELECT id_produto FROM produto WHERE sku='COL_03'),3,'Laranja Mecânica - Edição de Luxo'),
       ((SELECT id_produto FROM produto WHERE sku='COL_04'),4,'Saneamento Básico - Figure'),
       ((SELECT id_produto FROM produto WHERE sku='COL_05'),5,'Blade Runner - Poster Vintage'),
       ((SELECT id_produto FROM produto WHERE sku='COL_06'),6,'Click - Controle Remoto Replica'),
       ((SELECT id_produto FROM produto WHERE sku='COL_07'),7,'Shrek - Boneco Ogrão'),
       ((SELECT id_produto FROM produto WHERE sku='COL_08'),8,'Gato de Botas 2 - Espada Mini'),
       ((SELECT id_produto FROM produto WHERE sku='COL_09'),9,'Toy Story - Woody Miniatura'),
       ((SELECT id_produto FROM produto WHERE sku='COL_10'),10,'Taxi NY - Plaquinha Comemorativa');

-- ===========================
-- CLIENTES (300) - variedade demográfica
-- ===========================

INSERT INTO cliente (cpf, nome, email, data_nascimento, pontos_acumulados)
SELECT
    lpad((10000000000 + g)::text, 11, '0') || '-00' AS cpf,
    'Cliente ' || g AS nome,
    'cliente' || g || '@exemplo.com' AS email,
    (date '1974-01-01' + ((random() * (date '2009-12-31' - date '1974-01-01'))::int))::date AS data_nascimento,
    (random()*2000)::int AS pontos_acumulados
FROM generate_series(1, 300) g;

-- ===========================
-- SESSOES (50, media 2-3 sessoes por filme) geração procedural
-- - distribui sessões entre salas e filmes
-- - cria pré-estreias (algumas datas < data_estreia do filme)
-- ===========================

WITH filmes_peso AS (
    SELECT unnest(ARRAY[
        1,1, -- filme 1 aparece 2x mais, etc
        2,
        3,
        4,4,4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,11,
        12,12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,19,
        20
        ]) AS id_filme
)
INSERT INTO sessao (id_sala, id_filme, data, horario, tipo_exibicao, tipo_audio)
SELECT ((g-1) % 7) + 1 AS id_sala,
       f.id_filme,
       (date '2025-10-04' + ((g-1) % 88))::date AS data,
       (array['13:00','14:30','15:00','17:30','19:30','21:30','23:00'])[((g-1) % 7) + 1]::time AS horario,
       CASE
           WHEN (SELECT tipo FROM sala WHERE id_sala = ((g-1) % 7) + 1) = 'IMAX' THEN 'IMAX'
           ELSE CASE WHEN random() < 0.12 THEN '3D' ELSE 'NORMAL' END
           END AS tipo_exibicao,
       CASE WHEN random() < 0.5 THEN 'DUBLADO' ELSE 'LEGENDADO' END AS tipo_audio
FROM generate_series(1, 50) g
         JOIN LATERAL (
    SELECT id_filme
    FROM filmes_peso
    OFFSET ((g-1) % (SELECT count(*) FROM filmes_peso))
        LIMIT 1
    ) f ON true;

-- ===========================
-- GERAÇÃO de INGRESSOS + COMPRAS (1:1) até 2500 (media 50 ingressos por sessao x 50 sessoes)
-- regras:
--  - para SESSÕES FULL: preencher todos os assentos (respeitando limite global)
--  - filmes 11 e 18 -> ~50% MEIA
-- ===========================
DO $$
    DECLARE
        total_target      INT := 2500;      -- total de ingressos a gerar no seed
        created           INT := 0;

        rec               RECORD;
        assento_rec       RECORD;

        prod_reg          INT := (SELECT id_produto FROM produto WHERE sku = 'ING_REG');
        prod_half         INT := (SELECT id_produto FROM produto WHERE sku = 'ING_HALF');

        purchase_id       INT;
        cliente_id        INT;
        tipo_ticket       TEXT;

        seats_to_sell     INT;

    BEGIN
        -- ITERAR SESSÕES EM ORDEM ALEATÓRIA
        FOR rec IN
            SELECT
                s.id_sessao,
                s.id_filme,
                s.id_sala,
                s.data,
                sala.capacidade AS cap
            FROM sessao s
                     JOIN sala ON sala.id_sala = s.id_sala
            ORDER BY random()
            LOOP
                EXIT WHEN created >= total_target;

                -- QUANTOS INGRESSOS SORTEAR PARA ESTA SESSÃO (entre 20% e 60% da capacidade)
                seats_to_sell := CEIL(rec.cap * (0.20 + random() * 0.40));

                -- PEGAR ASSENTOS ALEATÓRIOS PARA VENDER
                FOR assento_rec IN
                    SELECT id_assento
                    FROM assento
                    WHERE id_sala = rec.id_sala
                    ORDER BY random()
                    LIMIT seats_to_sell
                    LOOP
                        EXIT WHEN created >= total_target;

                        -- EVITAR ASSENTO DUPLICADO
                        IF EXISTS (
                            SELECT 1 FROM ingresso
                            WHERE id_sessao = rec.id_sessao
                              AND id_assento = assento_rec.id_assento
                        ) THEN
                            CONTINUE;
                        END IF;

                        -- SORTEIO DO TIPO DE INGRESSO
                        IF rec.id_filme IN (11, 18) THEN
                            tipo_ticket := CASE WHEN random() < 0.5 THEN 'MEIA' ELSE 'INTEIRA' END;
                        ELSE
                            tipo_ticket := CASE WHEN random() < 0.4 THEN 'MEIA' ELSE 'INTEIRA' END;
                        END IF;

                        -- CLIENTE ALEATÓRIO
                        cliente_id := (random() * 299)::int + 1;

                        -- CRIA COMPRA
                        INSERT INTO compra (id_cliente, data_compra)
                        VALUES (cliente_id, rec.data::timestamp)
                        RETURNING id_compra INTO purchase_id;

                        -- PRODUTO BASEADO NO TIPO
                        INSERT INTO ingresso (id_compra, id_produto, id_sessao, id_assento, tipo)
                        VALUES (
                                   purchase_id,
                                   CASE WHEN tipo_ticket = 'MEIA' THEN prod_half ELSE prod_reg END,
                                   rec.id_sessao,
                                   assento_rec.id_assento,
                                   tipo_ticket
                               );

                        -- LIGA COMPRA AO PRODUTO
                        INSERT INTO compra_produto (
                            id_compra, id_produto, quantidade,
                            forma_pagamento, pontos_utilizados, pontos_ganhos
                        )
                        VALUES (
                                   purchase_id,
                                   CASE WHEN tipo_ticket = 'MEIA' THEN prod_half ELSE prod_reg END,
                                   1,
                                   (ARRAY['CRÉDITO','DÉBITO','PIX','FIDELIDADE'])[CEIL(random()*4)],
                                   CASE WHEN random() < 0.06 THEN (10 + (random()*300)::int) ELSE 0 END,
                                   (SELECT pontos_ganhos FROM produto
                                    WHERE id_produto = CASE WHEN tipo_ticket='MEIA' THEN prod_half ELSE prod_reg END)
                               );

                        created := created + 1;
                    END LOOP;
            END LOOP;

        RAISE NOTICE 'Created % tickets (target %)', created, total_target;

    END$$;

-- ===========================
-- VENDAS ADICIONAIS: SNACKS e COLECIONÁVEIS
-- ===========================
-- adicionar snacks a compras existentes

WITH ingresso_count AS (
    SELECT CEIL(COUNT(*) * 0.7)::int AS limit_count
    FROM ingresso
)
INSERT INTO compra_produto (id_compra, id_produto, quantidade, forma_pagamento, pontos_utilizados, pontos_ganhos)
SELECT
    g AS id_compra,                        -- INCREMENTAL (1..200)

    3 + ((g - 1) % 4) AS id_produto,       -- ciclo: 3,4,5,6

    1 + ((g - 1) % 3) AS quantidade,       -- ciclo: 1,2,3

    (ARRAY['CRÉDITO','DÉBITO','PIX'])[((g - 1) % 3) + 1] AS forma_pagamento,

    0 AS pontos_utilizados,
    0 AS pontos_ganhos
FROM ingresso_count, generate_series(1, ingresso_count.limit_count) g
ON CONFLICT DO NOTHING;

-- vendas de colecionáveis (algumas por pontos / fidelidade)
WITH ingresso_count AS (
    SELECT CEIL(COUNT(*) * 0.13)::int AS limit_count
    FROM ingresso
)
INSERT INTO compra_produto (id_compra, id_produto, quantidade, forma_pagamento, pontos_utilizados, pontos_ganhos)
SELECT
    g AS id_compra,                         -- INCREMENTAL: 1,2,3,...70

    7 + ((g - 1) % 10) AS id_produto,       -- ciclo 7–16

    1 AS quantidade,

    CASE
        WHEN (g % 5) = 0 THEN 'FIDELIDADE'
        ELSE (ARRAY['CRÉDITO','PIX'])[((g - 1) % 2) + 1]
        END,

    CASE
        WHEN (g % 5) = 0 THEN 100 + ((g - 1) % 600)
        ELSE 0
        END,

    (SELECT pontos_ganhos FROM produto WHERE id_produto = 7 + ((g - 1) % 10))
FROM ingresso_count, generate_series(1, ingresso_count.limit_count) g
ORDER BY random()
ON CONFLICT DO NOTHING;

-- ===========================
-- PONTUAÇÃO (eventos)
-- ===========================

INSERT INTO pontuacao (id_cliente, id_compra, tipo, valor, data_registro)
SELECT ((random()*299)::int)+1,
       (SELECT id_compra
        FROM compra
        ORDER BY random()
        LIMIT 1), CASE
                      WHEN random() < 0.8 THEN 'GANHO'
                      ELSE 'USO'
           END,
       1 + (random()*300)::int,
       now() - (random() * (365*24*60*60) || ' seconds')::interval
FROM generate_series(1, 400) g;

-- ===========================
-- RESGATES (usando pontos)
-- ===========================

INSERT INTO resgate (id_cliente, id_produto, pontos_utilizados, data_resgate)
SELECT ((random()*299)::int)+1,
       (SELECT id_produto
        FROM produto
        WHERE sku LIKE 'COL_%'
        ORDER BY random()
        LIMIT 1), 100 + (random()*700)::int,
       now() - (random() * (365*24*60*60) || ' seconds')::interval
FROM generate_series(1, 150) g;
