package com.each.eirv.cinema_each.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.each.eirv.cinema_each.dto.BilheteriaPorGeneroDTO;
import com.each.eirv.cinema_each.dto.DuracaoPorGeneroDTO;
import com.each.eirv.cinema_each.dto.BilheteriaPorDiretorDTO;

import com.each.eirv.cinema_each.service.EstatisticaRankingService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/estatistica-ranking")
@RequiredArgsConstructor


public class EstatisticaRankingController {
    
    private final EstatisticaRankingService estatisticaRankingService;

    @GetMapping("/bilheteria-genero")
	public ResponseEntity<List<BilheteriaPorGeneroDTO>> getBilheteriaPorGenero() {
		List<BilheteriaPorGeneroDTO> bilheteriaGenero = estatisticaRankingService.consultarBilheteriaPorGenero();
		return ResponseEntity.ok(bilheteriaGenero);
	}

    @GetMapping("/duracao-genero")
	public ResponseEntity<List<DuracaoPorGeneroDTO>> getDuracaoPorGenero(
		@RequestParam("dt_hoje")
		@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dt_hoje
	) {
		List<DuracaoPorGeneroDTO> duracaoGenero = estatisticaRankingService.consultarDuracaoPorGenero(dt_hoje);
		return ResponseEntity.ok(duracaoGenero);
	}

    @GetMapping("/bilheteria-diretor")
	public ResponseEntity<List<BilheteriaPorDiretorDTO>> getBilheteriaDiretor(
		@RequestParam("diretor") String diretor
	) {
		List<BilheteriaPorDiretorDTO> bilheteriaDiretor = estatisticaRankingService.consultarBilheteriaDiretor(diretor);
		return ResponseEntity.ok(bilheteriaDiretor);
	}
}
