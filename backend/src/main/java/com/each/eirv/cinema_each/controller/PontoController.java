package com.each.eirv.cinema_each.controller;

import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.each.eirv.cinema_each.dto.ProdutosResgatadosDTO;

import com.each.eirv.cinema_each.service.PontoService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/pontos")
@RequiredArgsConstructor

public class PontoController {

    private final PontoService pontoService;
    @GetMapping("/produtos-resgatados")
	public ResponseEntity<List<ProdutosResgatadosDTO>> getReceitaProdutosResgatados() {
		List<ProdutosResgatadosDTO> produtosResgatados = pontoService.consultarProdutosResgatados();
		return ResponseEntity.ok(produtosResgatados);
	}
    
}
