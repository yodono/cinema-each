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

    public List<FormaPagamentoDTO> consultarFormaPagamentoMaisUtilizada_ingresso() {
		return vendaProdutoRepository.consultarFormaPagamentoMaisUtilizada_ingresso();
	}

    public List<VendasSnacksDTO> consultarVendasSnacks(LocalDate data, LocalDate data2) {
		if (data == null){
			throw new IllegalArgumentException("Dara inválida");
		}else if (data2 == null){
			throw new IllegalArgumentException("Data inválida");
		}
		return vendaProdutoRepository.consultarVendasSnacks(data, data2);
	}

    public List<ReceitaColecionaveisDTO> consultarReceitaColecionaveis() {
		return vendaProdutoRepository.consultarReceitaColecionaveis();
	}
    
}
