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
    public List<FormaPagamentoDTO> consultarFormaPagamentoMaisUtilizada_ingresso() {
        String sql = """
            SELECT cp.forma_pagamento, COUNT(*) AS Ingressos_Comprados
            FROM compra_produto cp JOIN ingresso i
            ON cp.id_produto = i.id_produto
            GROUP BY cp.forma_pagamento
            ORDER BY COUNT(*) DESC;
        """;

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(FormaPagamentoDTO.class));
    }

    // RF26 - Vendas de Snacks
    public List<VendasSnacksDTO> consultarVendasSnacks(LocalDate data, LocalDate data2){
        String sql = """
                SELECT s.nome as snack, SUM(cp.quantidade) as quantidade_vendida
                FROM snack s
                JOIN compra_produto cp ON cp.id_produto = s.id_produto
                JOIN compra c ON cp.id_compra = c.id_compra
                WHERE c.data_compra BETWEEN (? - INTERVAL '7 days') AND ?
                GROUP BY s.id_produto
                ORDER BY quantidade_vendida DESC;
                """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(VendasSnacksDTO.class), data, data2);
    }

    // RF27 - Receita de Colecionáveis
    public List<ReceitaColecionaveisDTO> consultarReceitaColecionaveis(){
        String sql = """
                SELECT f.titulo as filme, SUM(cp.quantidade * p.preco_base) as valor_de_receita
                FROM colecionavel c
                JOIN filme f ON c.id_filme = f.id_filme
                JOIN produto p ON p.id_produto = c.id_produto
                JOIN compra_produto ON cp.id_produto = c.id_produto
                GROUP BY f.id_filme
                ORDER BY valor_de_receita DESC;
                """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ReceitaColecionaveisDTO.class));
    }

}
