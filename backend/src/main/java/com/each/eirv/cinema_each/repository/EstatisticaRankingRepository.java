package com.each.eirv.cinema_each.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.each.eirv.cinema_each.dto.BilheteriaPorGeneroDTO;
import com.each.eirv.cinema_each.dto.DuracaoPorGeneroDTO;
import com.each.eirv.cinema_each.dto.BilheteriaPorDiretorDTO;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor


public class EstatisticaRankingRepository {

    private final JdbcTemplate jdbcTemplate;

     // RF12 - Comparativo de Bilheteria por Gênero
    public List<BilheteriaPorGeneroDTO> consultarBilheteriaPorGenero(){
        String sql = """
                SELECT g.nome as genero, SUM(p.preco_base * cp.quantidade) as valor_Total
                FROM ingresso i 
                JOIN produto p ON i.id_produto = p.id_produto
                JOIN compra_produto cp ON cp.id_produto = p.id_produto
                JOIN sessao s ON s.id_sessao = i.id_sessao
                JOIN filme_genero fg ON s.id_filme = fg.id_filme
                JOIN genero g ON g.id_genero = fg.id_genero
                GROUP BY g.nome
                ORDER BY SUM(p.preco_base * cp.quantidade) DESC;
                """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(BilheteriaPorGeneroDTO.class));
    }

    // RF15 - Duração Média por Gênero
    public List<DuracaoPorGeneroDTO> consultarDuracaoPorGenero(LocalDate dt_hoje){
        String sql = """
                SELECT g.nome as genero, avg(f.duracao) as duracao_media
                FROM filme f 
                JOIN filme_genero fg ON f.id_filme = fg.id_filme
                JOIN genero g ON g.id_genero = fg.id_genero
                WHERE ? BETWEEN f.data_estreia AND data_fim_cartaz
                GROUP BY g.nome;
                """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(DuracaoPorGeneroDTO.class), dt_hoje);
    }


    // RF24 - Bilheteria por Diretor
    public List<BilheteriaPorDiretorDTO> consultarBilheteriaDiretor(){
        String sql = """
                SELECT d.nome as diretor, SUM(p.preco_base * cp.quantidade) as valor_de_bilheteria
                FROM diretor d
                JOIN dirige_filme df ON d.id_diretor = df.id_diretor
                JOIN filme f ON f.id_filme = df.id_filme
                JOIN sessao s ON f.id_filme = s.id_filme
                JOIN ingresso i ON i.id_sessao = s.id_sessao
                JOIN produto p ON p.id_produto = i.id_produto
                JOIN compra_produto cp ON p.id_produto = cp.id_produto
                GROUP BY d.nome
                """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(BilheteriaPorDiretorDTO.class));
    }
    
}
