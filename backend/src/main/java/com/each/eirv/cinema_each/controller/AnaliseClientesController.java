package com.each.eirv.cinema_each.controller;

import com.each.eirv.cinema_each.dto.*;
import com.each.eirv.cinema_each.service.ClientesService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/publico") 
@RequiredArgsConstructor
public class AnaliseClientesController {

    private final ClientesService clientesService;

    // RF06 - Ranking de Clientes por Compra - filtro de data
    // /api/publico/clientes/ranking/compras?inicio=YYYY-MM-DD&fim=YYYY-MM-DD
    @GetMapping("/clientes/ranking/compras")
    public ResponseEntity<List<ClientesRankingDTO>> rankingClientesPorCompra(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        return ResponseEntity.ok(clientesService.getRankingClientesPorCompra(inicio, fim));
    }
    
    // RF29 - Ranking de Clientes por Resgate de Pontos
    // /api/publico/clientes/ranking/resgates
    @GetMapping("/clientes/ranking/resgates")
    public ResponseEntity<List<ClientesResgateRankingDTO>> rankingClientesPorResgate() {
        return ResponseEntity.ok(clientesService.getRankingClientesPorResgate());
    }

    // RF17 e RF07 - Idade Média
    // /api/publico/idade-media/filmes
    @GetMapping("/idade-media/filmes")
    public ResponseEntity<List<IdadeMediaDTO>> idadeMediaPorFilme() {
        return ResponseEntity.ok(clientesService.getIdadeMediaPorFilme());
    }
    // /api/publico/idade-media/generos
    @GetMapping("/idade-media/generos")
    public ResponseEntity<List<IdadeMediaDTO>> idadeMediaPorGenero() {
        return ResponseEntity.ok(clientesService.getIdadeMediaPorGenero());
    }

    // RF11 - Público Estudantil - filtro de data
    // /api/publico/estudantil/ranking?inicio=YYYY-MM-DD&fim=YYYY-MM-DD
    @GetMapping("/estudantil/ranking")
    public ResponseEntity<List<PublicoEstudantilDTO>> publicoEstudantilRanking(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        return ResponseEntity.ok(clientesService.getPublicoEstudantilRanking(inicio, fim));
    }

    // RF14 - Clientes sem Meia-entrada
    // /api/publico/clientes/sem-meia
    @GetMapping("/clientes/sem-meia")
    public ResponseEntity<List<ClientesSimplesDTO>> clientesSemMeiaEntrada() {
        return ResponseEntity.ok(clientesService.getClientesSemMeiaEntrada());
    }

    // RF10 - Clientes por Filme - busca/filtragem por id
    // /api/publico/clientes/por-filme?idFilme=X
    @GetMapping("/clientes/por-filme")
    public ResponseEntity<List<ClientesSimplesDTO>> clientesPorFilme(@RequestParam Long idFilme) {
        return ResponseEntity.ok(clientesService.getClientesPorFilme(idFilme));
    }

    // RF19 - Gêneros Mais Assistidos por Mês - filtro de data
    // /api/publico/generos/mensal?inicio=YYYY-MM-DD&fim=YYYY-MM-DD
    @GetMapping("/generos/mensal")
    public ResponseEntity<List<GeneroMensalDTO>> generosMaisAssistidosPorMes(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        return ResponseEntity.ok(clientesService.getGenerosMaisAssistidosPorMes(inicio, fim));
    }
}