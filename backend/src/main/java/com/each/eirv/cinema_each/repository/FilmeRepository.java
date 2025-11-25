package com.each.eirv.cinema_each.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.each.eirv.cinema_each.dto.AtorPorFilmeDTO;
import com.each.eirv.cinema_each.dto.AtoresPopularesDTO;
import com.each.eirv.cinema_each.dto.FilmePorDiretorDTO;
import com.each.eirv.cinema_each.dto.FilmesEmCartazDTO;
import com.each.eirv.cinema_each.dto.GeneroDiretorDTO;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class FilmeRepository {
    
    private final JdbcTemplate jdbcTemplate;

    // RF09 - Filmes em Cartaz por Gênero
    public List<FilmesEmCartazDTO> consultarFilmesEmCartaz(String genero_filme, LocalDate dt_hoje) {
        String sql = """
            SELECT f.titulo, f.sinopse, f.classificacao_etaria
            FROM filme f 
            JOIN filme_genero fg ON f.id_filme = fg.id_filme
            JOIN genero g ON fg.id_genero = g.id_genero
            WHERE g.nome = ?
            AND ? BETWEEN f.data_estreia AND f.data_fim_cartaz;
        """;

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(FilmesEmCartazDTO.class), genero_filme, dt_hoje);
    }

    // RF21 - Filmes por Diretor
    public List<FilmePorDiretorDTO> consultarFilmePorDiretor(String diretor){
        String sql = """
                SELECT f.titulo, f.sinopse, f.classificacao_etaria
                FROM filme f
                JOIN dirige_filme df ON f.id_filme = df.id_filme
                JOIN diretor d ON d.id_diretor = df.id_diretor
                WHERE d.nome = ?
                """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(FilmePorDiretorDTO.class), diretor);
    }

    // RF22 - Atores por Filme
    public List<AtorPorFilmeDTO> consultarAtorPorFilme(String filme){
        String sql = """
                SELECT a.nome as ator
                FROM ator a
                JOIN atua_em ae ON a.id_ator = ae.id_ator
                JOIN filme f ON f.id_filme = ae.id_filme
                WHERE f.titulo = ?
                """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(AtorPorFilmeDTO.class), filme);
    }

    // RF25 - Ranking de Atores Populares
    public List<AtoresPopularesDTO> consultarAtoresPopulares(){
        String sql = """
                SELECT a.nome as ator, SUM(cp.quantidade) as quantidade_ingressos
                FROM ator a 
                JOIN atua_em ae ON a.id_ator = ae.id_ator
                JOIN sessao s ON s.id_filme = ae.id_filme
                JOIN ingresso i ON i.id_sessao = s.id_sessao
                JOIN compra_produto cp ON cp.id_produto = i.id_produto
                GROUP BY a.id_ator
                ORDER BY SUM(cp.quantidade) DESC LIMIT 10;
                """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(AtoresPopularesDTO.class));
    }

    // RF23 - Gênero Mais Comum por Diretor
    public List<GeneroDiretorDTO> consultarGeneroDiretor(String diretor){
        String sql = """
                SELECT d.nome as diretor, g.nome as genero
                FROM diretor d
                JOIN dirige_filme df ON d.id_diretor = df.id_diretor
                JOIN filme f ON f.id_filme = df.id_filme
                JOIN filme_genero fg ON fg.id_filme = f.id_filme
                JOIn genero g ON g.id_genero = fg.id_genero
                WHERE d.nome = ?
                GROUP BY g.nome 
                ORDER BY COUNT(*) DESC LIMIT 1;
                """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(GeneroDiretorDTO.class), diretor);
    }

}
