package com.each.eirv.cinema_each.service;

import com.each.eirv.cinema_each.dto.*;
import com.each.eirv.cinema_each.repository.ClientesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientesService {

    private final ClientesRepository clientesRepository;

    // RF06 - Ranking de Clientes por Compra
    public List<ClientesRankingDTO> getRankingClientesPorCompra(LocalDate inicio, LocalDate fim) {
        return clientesRepository.rankingClientesPorCompra(inicio, fim);
    }

    // RF29 - Ranking por resgate
    public List<ClientesResgateRankingDTO> getRankingClientesPorResgate() {
        return clientesRepository.rankingClientesPorResgate();
    }

    // RF17 - Idade média por filme
    public List<IdadeMediaDTO> getIdadeMediaPorFilme() {
        return clientesRepository.consultarIdadeMediaPorFilme();
    }

    // RF07 - Idade média por gênero
    public List<IdadeMediaDTO> getIdadeMediaPorGenero() {
        return clientesRepository.consultarIdadeMediaPorGenero();
    }

    // RF11 - Público estudantil
    public List<PublicoEstudantilDTO> getPublicoEstudantilRanking(LocalDate inicio, LocalDate fim) {
        return clientesRepository.consultarPublicoEstudantil(inicio, fim);
    }

    // RF14 - Clientes sem meia
    public List<ClientesSimplesDTO> getClientesSemMeiaEntrada() {
        return clientesRepository.consultarClientesSemMeiaEntrada();
    }

    // RF10 - Clientes por Filme
    public List<ClientesSimplesDTO> getClientesPorFilme(Long idFilme) {
        if (idFilme == null || idFilme <= 0) {
            throw new IllegalArgumentException("ID do Filme inválido.");
        }

        return clientesRepository.consultarClientesPorFilme(idFilme);
    }

    // RF19 - Gêneros mais assistidos por mês
    public List<GeneroMensalDTO> getGenerosMaisAssistidosPorMes(LocalDate inicio, LocalDate fim) {
        return clientesRepository.consultarGenerosMaisAssistidosPorMes(inicio, fim);
    }
}
