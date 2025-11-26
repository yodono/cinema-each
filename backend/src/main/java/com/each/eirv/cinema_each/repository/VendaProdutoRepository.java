package com.each.eirv.cinema_each.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.each.eirv.cinema_each.dto.FormaPagamentoDTO;
import com.each.eirv.cinema_each.dto.ReceitaColecionaveisDTO;
import com.each.eirv.cinema_each.dto.VendasSnacksDTO;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class VendaProdutoRepository {
    
    private final JdbcTemplate jdbcTemplate;

    // RF08 - FORMAS DE PAGAMENTO
    public List<FormaPagamentoDTO> consultarFormaPagamentoMaisUtilizada() {
        String sql = """
            SELECT cp.forma_pagamento, COUNT(DISTINCT cp.id_compra) AS ingressos_comprados
            FROM compra_produto cp
            JOIN ingresso i ON cp.id_produto = i.id_produto
            GROUP BY cp.forma_pagamento
            ORDER BY ingressos_comprados DESC;
        """;

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(FormaPagamentoDTO.class));
    }

    // RF26 - Vendas de Snacks
    public List<VendasSnacksDTO> consultarVendasSnacks(){
        String sql = """
                SELECT
                    s.nome AS snack,
                    CASE EXTRACT(DOW FROM c.data_compra)
                      WHEN 0 THEN 'domingo'
                      WHEN 1 THEN 'segunda-feira'
                      WHEN 2 THEN 'terça-feira'
                      WHEN 3 THEN 'quarta-feira'
                      WHEN 4 THEN 'quinta-feira'
                      WHEN 5 THEN 'sexta-feira'
                      WHEN 6 THEN 'sábado'
                    END AS dia_semana,
                    EXTRACT(DOW FROM c.data_compra) AS dow,
                    SUM(cp.quantidade) AS quantidade_vendida
                FROM snack s
                JOIN compra_produto cp ON cp.id_produto = s.id_produto
                JOIN compra c ON cp.id_compra = c.id_compra
                GROUP BY s.nome, dia_semana, dow
                ORDER BY dow, s.nome;
                """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(VendasSnacksDTO.class));
    }

    // RF27 - Receita de Colecionáveis
    public List<ReceitaColecionaveisDTO> consultarReceitaColecionaveis(){
        String sql = """
                SELECT f.titulo as filme, SUM(cp.quantidade * p.preco_base) as valor_de_receita
                FROM colecionavel c
                JOIN filme f ON c.id_filme = f.id_filme
                JOIN produto p ON p.id_produto = c.id_produto
                JOIN compra_produto cp ON cp.id_produto = c.id_produto
                GROUP BY f.id_filme
                ORDER BY valor_de_receita DESC;
                """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ReceitaColecionaveisDTO.class));
    }

}
