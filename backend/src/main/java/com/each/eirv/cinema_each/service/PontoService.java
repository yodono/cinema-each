package com.each.eirv.cinema_each.service;

import com.each.eirv.cinema_each.dto.ProdutosResgatadosDTO;

import com.each.eirv.cinema_each.repository.PontoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor

public class PontoService {

    private final PontoRepository pontoRepository;

    public List<ProdutosResgatadosDTO> consultarProdutosResgatados() {
		return pontoRepository.consultarProdutosResgatados();
	}
    
}
