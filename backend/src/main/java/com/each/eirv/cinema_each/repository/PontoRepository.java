package com.each.eirv.cinema_each.repository;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.each.eirv.cinema_each.dto.ProdutosResgatadosDTO;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor

public class PontoRepository {
    
    private final JdbcTemplate jdbcTemplate;

    // RF28 - Produtos Resgatados com Pontos
    public List<ProdutosResgatadosDTO> consultarProdutosResgatados(){
        String sql = """
                SELECT COALESCE(col.nome, snk.nome, 'Ingresso') AS nome_produto, 
                SUM(cp.quantidade) AS total_resgatado
                FROM produto p 
                LEFT JOIN colecionavel col ON col.id_produto = p.id_produto
                LEFT JOIN snack snk ON snk.id_produto = p.id_produto
                JOIN compra_produto cp ON cp.id_produto = p.id_produto
                WHERE cp.pontos_utilizados > 0 AND cp.forma_pagamento = 'Fidelidade'    
                GROUP BY p.id_produto, col.nome, snk.nome 
                ORDER BY total_resgatado DESC 
                LIMIT 10;
                """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ProdutosResgatadosDTO.class));
    }
}
