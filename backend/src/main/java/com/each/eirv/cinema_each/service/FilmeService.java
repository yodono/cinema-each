package com.each.eirv.cinema_each.service;

import com.each.eirv.cinema_each.dto.AtorPorFilmeDTO;
import com.each.eirv.cinema_each.dto.AtoresPopularesDTO;
import com.each.eirv.cinema_each.dto.FilmePorDiretorDTO;
import com.each.eirv.cinema_each.dto.FilmesEmCartazDTO;
import com.each.eirv.cinema_each.dto.GeneroDiretorDTO;


import com.each.eirv.cinema_each.repository.FilmeRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.List;


@Service
@RequiredArgsConstructor

public class FilmeService {

    private final FilmeRepository filmeRepository;

    public List<FilmesEmCartazDTO> consultarFilmesEmCartaz(String genero_filme, LocalDate dt_hoje) {
		if (genero_filme == null){
			throw new IllegalArgumentException("Gênero inválido");
		}else if (dt_hoje == null){
			throw new IllegalArgumentException("Data de hoje inválida");
		}
		return filmeRepository.consultarFilmesEmCartaz(genero_filme, dt_hoje);
	}

    public List<FilmePorDiretorDTO> consultarFilmePorDiretor(String diretor) {
		if (diretor == null){
			throw new IllegalArgumentException("Nome do diretor inválido");
		}
		return filmeRepository.consultarFilmePorDiretor(diretor);
	}

    public List<GeneroDiretorDTO> consultarGeneroDiretor(String diretor) {
		if (diretor == null){
			throw new IllegalArgumentException("Nome do diretor inválido");
		}
		return filmeRepository.consultarGeneroDiretor(diretor);
	}

    public List<AtorPorFilmeDTO> consultarAtorPorFilme(String filme) {
		if (filme == null){
			throw new IllegalArgumentException("Nome do filme inválido");
		}
		return filmeRepository.consultarAtorPorFilme(filme);
	}

    public List<AtoresPopularesDTO> consultarAtoresPopulares() {
		return filmeRepository.consultarAtoresPopulares();
	}
    
}
