package com.each.eirv.cinema_each.repository;

import java.time.LocalDate;
import java.util.List;

import com.each.eirv.cinema_each.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SessaoRepository {

    private final JdbcTemplate jdbcTemplate;

    // RF01 – Consultar Pré-estreias
    public List<SessaoDTO> consultarPreEstreias(LocalDate inicio, LocalDate fim) {
        String sql = """
            SELECT
                s.id_sessao,
                f.titulo AS filme,
                s.data,
                s.horario,
                sa.numero AS sala,
                s.tipo_exibicao,
                s.tipo_audio
            FROM sessao s
            JOIN filme f ON s.id_filme = f.id_filme
            JOIN sala sa ON s.id_sala = sa.id_sala
            WHERE s.data BETWEEN ? AND ?
              AND s.data < f.data_estreia
            ORDER BY s.data, s.horario;
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(SessaoDTO.class), inicio, fim);
    }

    // RF02 – Vendas por Sessão
    public List<VendaSessaoDTO> consultarVendasPorSessao() {
        String sql = """
            SELECT
                s.id_sessao,
                f.titulo AS filme,
                COUNT(i.id_produto) AS total_vendidos,
                COUNT(*) FILTER (WHERE i.tipo = 'INTEIRA') AS inteiras_vendidas,
                COUNT(*) FILTER (WHERE i.tipo = 'MEIA') AS meias_vendidas,
                SUM(COUNT(*) FILTER (WHERE i.tipo = 'INTEIRA'))
                    OVER () AS total_inteiras_geral,
                SUM(COUNT(*) FILTER (WHERE i.tipo = 'MEIA'))
                    OVER () AS total_meias_geral
            FROM sessao s
            JOIN filme f ON s.id_filme = f.id_filme
            LEFT JOIN ingresso i ON s.id_sessao = i.id_sessao
            GROUP BY s.id_sessao, f.titulo
            ORDER BY s.id_sessao;
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(VendaSessaoDTO.class));
    }

    // RF03 – Bilheteria e Arrecadação
    public List<BilheteriaDTO> consultarBilheteriaPorFilme() {
        String sql = """
            SELECT
                f.titulo,
                SUM(p.preco_base) AS arrecadacao_total,
                COUNT(i.id_produto) AS ingressos_vendidos
            FROM filme f
            JOIN sessao s ON f.id_filme = s.id_filme
            JOIN ingresso i ON s.id_sessao = i.id_sessao
            JOIN produto p ON i.id_produto = p.id_produto
            GROUP BY f.titulo
            ORDER BY arrecadacao_total DESC;
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(BilheteriaDTO.class));
    }

    // RF04 – Taxa de Ocupação por Sessão
    // RF05 – Sessões de Maior Ocupação por Sala
    public List<TaxaOcupacaoDTO> consultarTaxaOcupacao(boolean apenasMaioresPorSala) {
        String baseSql = """
            SELECT
                %s
                s.id_sessao,
                f.titulo,
                sa.numero AS sala,
                sa.capacidade,
                COUNT(i.id_produto) AS ingressos_vendidos,
                ROUND((COUNT(i.id_produto)::NUMERIC / sa.capacidade) * 100, 2) AS taxa_ocupacao_percentual
            FROM sessao s
            JOIN filme f ON s.id_filme = f.id_filme
            JOIN sala sa ON s.id_sala = sa.id_sala
            LEFT JOIN ingresso i ON s.id_sessao = i.id_sessao
            GROUP BY %s s.id_sessao, f.titulo, sa.numero, sa.capacidade
            ORDER BY %s;
        """;

        String distinctClause = apenasMaioresPorSala ? "DISTINCT ON (sa.id_sala)\n" : "";
        String groupByClause = apenasMaioresPorSala ? "sa.id_sala," : "";
        String orderByClause = apenasMaioresPorSala
                ? "sa.id_sala, taxa_ocupacao_percentual DESC"
                : "taxa_ocupacao_percentual DESC";

        String sql = String.format(baseSql, distinctClause, groupByClause, orderByClause);

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TaxaOcupacaoDTO.class));
    }

    // RF13 – Vendas por Dia da Semana
    public List<VendasPorDiaDTO> consultarVendasPorDiaSemana() {
        String sql = """
        SELECT
            CASE EXTRACT(DOW FROM s.data)
              WHEN 0 THEN 'domingo'
              WHEN 1 THEN 'segunda-feira'
              WHEN 2 THEN 'terça-feira'
              WHEN 3 THEN 'quarta-feira'
              WHEN 4 THEN 'quinta-feira'
              WHEN 5 THEN 'sexta-feira'
              WHEN 6 THEN 'sábado'
            END AS dia_semana,
            EXTRACT(DOW FROM s.data) AS dow,
            COUNT(i.id_produto) AS ingressos_vendidos,
            COUNT(*) FILTER (WHERE i.tipo = 'INTEIRA') AS inteiras,
            COUNT(*) FILTER (WHERE i.tipo = 'MEIA') AS meias
        FROM sessao s
        LEFT JOIN ingresso i ON s.id_sessao = i.id_sessao
        GROUP BY dia_semana, dow
        ORDER BY dow;
    """;

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(VendasPorDiaDTO.class));
    }

    // RF16 – Horários Populares
    // (Horários com mais ingressos vendidos)
    public List<HorarioPopularDTO> consultarHorariosPopulares() {
        String sql = """
        SELECT
            s.horario,
            COUNT(i.id_produto) AS ingressos_vendidos
        FROM sessao s
        LEFT JOIN ingresso i ON s.id_sessao = i.id_sessao
        GROUP BY s.horario
        ORDER BY ingressos_vendidos DESC;
    """;

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(HorarioPopularDTO.class));
    }

    // RF18 – Filmes com mais sessões
    public List<FilmeSessaoCountDTO> consultarFilmesComMaisSessoes() {
        String sql = """
        SELECT
            f.titulo,
            COUNT(s.id_sessao) AS total_sessoes
        FROM filme f
        JOIN sessao s ON f.id_filme = s.id_filme
        GROUP BY f.titulo
        ORDER BY total_sessoes DESC;
    """;

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(FilmeSessaoCountDTO.class));
    }

    // RF20 – Comparativo de Bilheteria por Tipo de Sala (VIP, Comum, IMAX)
    public List<BilheteriaPorSalaDTO> consultarBilheteriaPorSala() {
        String sql = """
        SELECT
            sa.tipo AS tipo_sala,
            SUM(p.preco_base * cp.quantidade) AS arrecadacao_total,
            COUNT(i.id_produto * cp.quantidade)  AS ingressos_vendidos
        FROM sala sa
        JOIN sessao s ON sa.id_sala = s.id_sala
        LEFT JOIN ingresso i ON s.id_sessao = i.id_sessao
        LEFT JOIN produto p ON i.id_produto = p.id_produto
        JOIN compra_produto cp ON p.id_produto = cp.id_produto
        GROUP BY sa.tipo
        ORDER BY arrecadacao_total DESC;
    """;

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(BilheteriaPorSalaDTO.class));
    }
}




