package com.each.eirv.cinema_each.repository;

import com.each.eirv.cinema_each.dto.ClientesRankingDTO;
import com.each.eirv.cinema_each.dto.ClientesResgateRankingDTO;
import com.each.eirv.cinema_each.dto.ClientesSimplesDTO;
import com.each.eirv.cinema_each.dto.GeneroMensalDTO;
import com.each.eirv.cinema_each.dto.IdadeMediaDTO;
import com.each.eirv.cinema_each.dto.PublicoEstudantilDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ClientesRepository {

    private final JdbcTemplate jdbcTemplate;

    // RF06 - Ranking de Clientes por Compra
    public List<ClientesRankingDTO> rankingClientesPorCompra(LocalDate inicio, LocalDate fim) {
        String sql = """
            SELECT
                c.id_cliente,
                c.nome,
                c.cpf,
                SUM(cp.quantidade) AS total_produtos_comprados
            FROM cliente c
            JOIN compra co ON c.id_cliente = co.id_cliente
            JOIN compra_produto cp ON co.id_compra = cp.id_compra
            JOIN ingresso i ON cp.id_compra = i.id_compra
            WHERE co.data_compra >= COALESCE(?, '1900-01-01'::timestamp) 
            AND co.data_compra <= COALESCE(?, '2999-12-31'::timestamp) 
            GROUP BY c.id_cliente, c.nome, c.cpf
            ORDER BY total_produtos_comprados DESC;
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ClientesRankingDTO.class), inicio, fim);
    }

    // RF29 - Ranking de Clientes por Resgate de Pontos
    public List<ClientesResgateRankingDTO> rankingClientesPorResgate() {
        String sql = """
            SELECT
                c.id_cliente,
                c.nome,
                c.cpf,
                SUM(r.pontos_utilizados) AS total_pontos_resgatados
            FROM cliente c
            JOIN resgate r ON c.id_cliente = r.id_cliente
            GROUP BY c.id_cliente, c.nome, c.cpf
            ORDER BY total_pontos_resgatados DESC;
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ClientesResgateRankingDTO.class));
    }

    // RF17 - Idade Média por Filme
    public List<IdadeMediaDTO> consultarIdadeMediaPorFilme() {
        String sql = """
            SELECT
                f.titulo AS nome,
                CAST(ROUND(AVG(EXTRACT(YEAR FROM AGE(c.data_nascimento)))) AS INTEGER) AS idade_media
            FROM cliente c
            JOIN compra co ON c.id_cliente = co.id_cliente
            JOIN compra_produto cp ON co.id_compra = cp.id_compra
            JOIN ingresso i ON cp.id_compra = i.id_compra
            JOIN sessao s ON i.id_sessao = s.id_sessao
            JOIN filme f ON s.id_filme = f.id_filme
            GROUP BY f.titulo
            ORDER BY idade_media DESC;
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(IdadeMediaDTO.class));
    }
    
    // RF07 - Idade Média por Gênero de Filme
    public List<IdadeMediaDTO> consultarIdadeMediaPorGenero() {
        String sql = """
            SELECT
                g.nome AS nome,
                CAST(ROUND(AVG(EXTRACT(YEAR FROM AGE(c.data_nascimento)))) AS INTEGER) AS idade_media
            FROM cliente c
            JOIN compra co ON c.id_cliente = co.id_cliente
            JOIN compra_produto cp ON co.id_compra = cp.id_compra
            JOIN ingresso i ON cp.id_compra = i.id_compra
            JOIN sessao s ON i.id_sessao = s.id_sessao
            JOIN filme f ON s.id_filme = f.id_filme
            JOIN filme_genero fg ON f.id_filme = fg.id_filme
            JOIN genero g ON fg.id_genero = g.id_genero
            GROUP BY g.nome
            ORDER BY idade_media DESC;
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(IdadeMediaDTO.class));
    }
    
    // RF11 - Público Estudantil
    public List<PublicoEstudantilDTO> consultarPublicoEstudantil(LocalDate inicio, LocalDate fim) {
        String sql = """
            SELECT
                f.titulo,
                COUNT(*) FILTER (WHERE i.tipo = 'MEIA') AS total_meia_entrada,
                COUNT(i.id_produto) AS total_ingressos,
                ROUND((COUNT(*) FILTER (WHERE i.tipo = 'MEIA')::NUMERIC / COUNT(i.id_produto)) * 100, 2) AS percentual_meia_entrada
            FROM filme f
            JOIN sessao s ON f.id_filme = s.id_filme
            JOIN ingresso i ON s.id_sessao = i.id_sessao
            WHERE s.data >= COALESCE(?, '1900-01-01'::date)
            AND s.data <= COALESCE(?, '2999-12-31'::date) 
            GROUP BY f.titulo
            HAVING COUNT(i.id_produto) > 0
            ORDER BY percentual_meia_entrada DESC;
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(PublicoEstudantilDTO.class), inicio, fim);
    }
    
    // RF14 - Clientes sem Meia-entrada
    public List<ClientesSimplesDTO> consultarClientesSemMeiaEntrada() {
        String sql = """
            SELECT
                c.id_cliente,
                c.nome,
                c.cpf,
                c.email
            FROM cliente c
            WHERE c.id_cliente NOT IN (
                SELECT DISTINCT co.id_cliente
                FROM compra co
                JOIN compra_produto cp ON co.id_compra = cp.id_compra
                JOIN ingresso i ON cp.id_compra = i.id_compra
                WHERE i.tipo = 'MEIA'
            )
            ORDER BY c.nome;
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ClientesSimplesDTO.class));
    }
    
    // RF10 - Clientes por Filme
    public List<ClientesSimplesDTO> consultarClientesPorFilme(Long idFilme) {
        String sql = """
            SELECT DISTINCT
                c.id_cliente,
                c.nome,
                c.cpf,
                c.email
            FROM cliente c
            JOIN compra co ON c.id_cliente = co.id_cliente
            JOIN ingresso i ON co.id_compra = i.id_compra
            JOIN sessao s ON i.id_sessao = s.id_sessao
            JOIN filme f ON s.id_filme = f.id_filme
            WHERE f.id_filme = ?
            ORDER BY c.nome;
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ClientesSimplesDTO.class), idFilme);
    }
    
    // RF19 - Gêneros Mais Assistidos por Mês
    public List<GeneroMensalDTO> consultarGenerosMaisAssistidosPorMes(LocalDate inicio, LocalDate fim) {
        String sql = """
            SELECT
                EXTRACT(YEAR FROM s.data) AS ano,
                EXTRACT(MONTH FROM s.data) AS mes,
                g.nome AS nome_genero,
                COUNT(i.id_produto) AS total_ingressos
            FROM genero g
            JOIN filme_genero fg ON g.id_genero = fg.id_genero
            JOIN filme f ON fg.id_filme = f.id_filme
            JOIN sessao s ON f.id_filme = s.id_filme
            JOIN ingresso i ON s.id_sessao = i.id_sessao
            WHERE s.data >= COALESCE(?, '1900-01-01'::date)
            AND s.data <= COALESCE(?, '2999-12-31'::date)
            GROUP BY 1, 2, g.nome
            ORDER BY ano DESC, mes DESC, total_ingressos DESC;
        """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(GeneroMensalDTO.class), inicio, fim);
    }
}
