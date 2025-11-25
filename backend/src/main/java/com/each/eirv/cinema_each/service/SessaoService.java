package com.each.eirv.cinema_each.service;

import com.each.eirv.cinema_each.dto.BilheteriaDTO;
import com.each.eirv.cinema_each.dto.SessaoDTO;
import com.each.eirv.cinema_each.dto.TaxaOcupacaoDTO;
import com.each.eirv.cinema_each.dto.VendaSessaoDTO;

import com.each.eirv.cinema_each.repository.SessaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.List;


@Service
@RequiredArgsConstructor
public class SessaoService {

	private final SessaoRepository sessaoRepository;

	public List<SessaoDTO> consultarPreEstreias(LocalDate inicio, LocalDate fim) {
		if (inicio == null || fim == null) {
			throw new IllegalArgumentException("Período de pré-estreia inválido.");
		}
		return sessaoRepository.consultarPreEstreias(inicio, fim);
	}

	public List<VendaSessaoDTO> consultarVendasPorSessao() {
		return sessaoRepository.consultarVendasPorSessao();
	}

	public List<BilheteriaDTO> consultarBilheteriaPorFilme() {
		return sessaoRepository.consultarBilheteriaPorFilme();
	}

	public List<TaxaOcupacaoDTO> consultarTaxaOcupacao() {
		return sessaoRepository.consultarTaxaOcupacao(false);
	}

	public List<TaxaOcupacaoDTO> consultarSessoesMaisLotadas() {
		return sessaoRepository.consultarTaxaOcupacao(true);
	}
}