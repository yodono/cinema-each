package com.each.eirv.cinema_each.service;

import com.each.eirv.cinema_each.dto.BilheteriaPorGeneroDTO;
import com.each.eirv.cinema_each.dto.DuracaoPorGeneroDTO;
import com.each.eirv.cinema_each.dto.BilheteriaPorDiretorDTO;

import com.each.eirv.cinema_each.repository.EstatisticaRankingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.List;


@Service
@RequiredArgsConstructor
public class EstatisticaRankingService {

    private final EstatisticaRankingRepository estatisticaRankingRepository;

    public List<BilheteriaPorGeneroDTO> consultarBilheteriaPorGenero() {
		return estatisticaRankingRepository.consultarBilheteriaPorGenero();
	}

    public List<DuracaoPorGeneroDTO> consultarDuracaoPorGenero(LocalDate dt_hoje) {
		if (dt_hoje == null){
			throw new IllegalArgumentException("Data de hoje inválida");
		}
		return estatisticaRankingRepository.consultarDuracaoPorGenero(dt_hoje);
	}

    public List<BilheteriaPorDiretorDTO> consultarBilheteriaDiretor() {
		return estatisticaRankingRepository.consultarBilheteriaDiretor();
	}
    
}
