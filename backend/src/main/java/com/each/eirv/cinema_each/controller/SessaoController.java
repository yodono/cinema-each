package com.each.eirv.cinema_each.controller;

import com.each.eirv.cinema_each.dto.BilheteriaDTO;
import com.each.eirv.cinema_each.dto.SessaoDTO;
import com.each.eirv.cinema_each.dto.TaxaOcupacaoDTO;
import com.each.eirv.cinema_each.dto.VendaSessaoDTO;
import com.each.eirv.cinema_each.service.SessaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/sessoes")
@RequiredArgsConstructor
public class SessaoController {

	private final SessaoService sessaoService;

	@GetMapping("/pre-estreias")
	public ResponseEntity<List<SessaoDTO>> getPreEstreias(
			@RequestParam("inicio")
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,

			@RequestParam("fim")
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim
	) {
		List<SessaoDTO> sessoes = sessaoService.consultarPreEstreias(inicio, fim);
		return ResponseEntity.ok(sessoes);
	}

	@GetMapping("/vendas")
	public ResponseEntity<List<VendaSessaoDTO>> getVendasPorSessao() {
		List<VendaSessaoDTO> vendas = sessaoService.consultarVendasPorSessao();
		return ResponseEntity.ok(vendas);
	}

	@GetMapping("/bilheteria")
	public ResponseEntity<List<BilheteriaDTO>> getBilheteriaPorFilme() {
		List<BilheteriaDTO> bilheteria = sessaoService.consultarBilheteriaPorFilme();
		return ResponseEntity.ok(bilheteria);
	}

	@GetMapping("/ocupacao")
	public ResponseEntity<List<TaxaOcupacaoDTO>> getTaxaOcupacao() {
		List<TaxaOcupacaoDTO> ocupacao = sessaoService.consultarTaxaOcupacao();
		return ResponseEntity.ok(ocupacao);
	}

	@GetMapping("/mais-lotadas")
	public ResponseEntity<List<TaxaOcupacaoDTO>> getSessoesMaisLotadas() {
		List<TaxaOcupacaoDTO> maisLotadas = sessaoService.consultarSessoesMaisLotadas();
		return ResponseEntity.ok(maisLotadas);
	}
}