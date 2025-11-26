package com.each.eirv.cinema_each.service;

import com.each.eirv.cinema_each.dto.FormaPagamentoDTO;
import com.each.eirv.cinema_each.dto.ReceitaColecionaveisDTO;
import com.each.eirv.cinema_each.dto.VendasSnacksDTO;

import com.each.eirv.cinema_each.repository.VendaProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor

public class VendaProdutoService {

    private final VendaProdutoRepository vendaProdutoRepository;

    public List<FormaPagamentoDTO> consultarFormaPagamentoMaisUtilizada() {
		return vendaProdutoRepository.consultarFormaPagamentoMaisUtilizada();
	}

    public List<VendasSnacksDTO> consultarVendasSnacks() {
		return vendaProdutoRepository.consultarVendasSnacks();
	}

    public List<ReceitaColecionaveisDTO> consultarReceitaColecionaveis() {
		return vendaProdutoRepository.consultarReceitaColecionaveis();
	}
    
}
