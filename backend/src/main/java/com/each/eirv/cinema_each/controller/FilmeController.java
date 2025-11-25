package com.each.eirv.cinema_each.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.each.eirv.cinema_each.dto.AtorPorFilmeDTO;
import com.each.eirv.cinema_each.dto.AtoresPopularesDTO;
import com.each.eirv.cinema_each.dto.FilmePorDiretorDTO;
import com.each.eirv.cinema_each.dto.FilmesEmCartazDTO;
import com.each.eirv.cinema_each.dto.GeneroDiretorDTO;

import com.each.eirv.cinema_each.service.FilmeService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/filmes")
@RequiredArgsConstructor


public class FilmeController {

    private final FilmeService filmeService;

    @GetMapping("/filmes-cartaz")
	public ResponseEntity<List<FilmesEmCartazDTO>> getFilmesEmCartaz(
		@RequestParam("genero_filme") String genero_filme,

		@RequestParam("dt_hoje")
		@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dt_hoje
	) {
		List<FilmesEmCartazDTO> filmesCartaz = filmeService.consultarFilmesEmCartaz(genero_filme, dt_hoje);
		return ResponseEntity.ok(filmesCartaz);
	}

    @GetMapping("/filme-diretor")
	public ResponseEntity<List<FilmePorDiretorDTO>> getFilmePorDiretor(
		@RequestParam("diretor") String diretor
	) {
		List<FilmePorDiretorDTO> filmeDiretor = filmeService.consultarFilmePorDiretor(diretor);
		return ResponseEntity.ok(filmeDiretor);
	}

    @GetMapping("/diretor-genero")
	public ResponseEntity<List<GeneroDiretorDTO>> getDiretorGenero(
		@RequestParam("diretor") String diretor
	) {
		List<GeneroDiretorDTO> generoDiretor = filmeService.consultarGeneroDiretor(diretor);
		return ResponseEntity.ok(generoDiretor);
	}

    @GetMapping("/ator-filme")
	public ResponseEntity<List<AtorPorFilmeDTO>> getAtorPorFilme(
		@RequestParam("filme") String filme
	) {
		List<AtorPorFilmeDTO> atorFilme = filmeService.consultarAtorPorFilme(filme);
		return ResponseEntity.ok(atorFilme);
	}

    @GetMapping("/atores-populares")
	public ResponseEntity<List<AtoresPopularesDTO>> getAtoresPopulares() {
		List<AtoresPopularesDTO> atoresPopulares = filmeService.consultarAtoresPopulares();
		return ResponseEntity.ok(atoresPopulares);
	}

}
