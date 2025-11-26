package com.each.eirv.cinema_each.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.each.eirv.cinema_each.dto.FormaPagamentoDTO;
import com.each.eirv.cinema_each.dto.ReceitaColecionaveisDTO;
import com.each.eirv.cinema_each.dto.VendasSnacksDTO;

import com.each.eirv.cinema_each.service.VendaProdutoService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/venda-produto")
@RequiredArgsConstructor

public class VendaProdutoController {
    
    private final VendaProdutoService vendaProdutoService;

    @GetMapping("/forma-pagamento")
	public ResponseEntity<List<FormaPagamentoDTO>> getFormaPagamento() {
		List<FormaPagamentoDTO> formaPagamento = vendaProdutoService.consultarFormaPagamentoMaisUtilizada();
		return ResponseEntity.ok(formaPagamento);
	}

    @GetMapping("/vendas-snacks")
	public ResponseEntity<List<VendasSnacksDTO>> getVendasSnacks(
			@RequestParam("data")
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data,

			@RequestParam("data2")
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data2
	) {
		List<VendasSnacksDTO> vendasSnacks = vendaProdutoService.consultarVendasSnacks(data, data2);
		return ResponseEntity.ok(vendasSnacks);
	}

    @GetMapping("/receita-colecionaveis")
	public ResponseEntity<List<ReceitaColecionaveisDTO>> getReceitaColecionaveis() {
		List<ReceitaColecionaveisDTO> receitaColecionaveis = vendaProdutoService.consultarReceitaColecionaveis();
		return ResponseEntity.ok(receitaColecionaveis);
	}
}
