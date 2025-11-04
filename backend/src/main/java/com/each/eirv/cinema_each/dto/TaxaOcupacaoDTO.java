package com.each.eirv.cinema_each.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaxaOcupacaoDTO {
    private Integer id_sessao;
    private String titulo;
    private Integer sala;
    private Integer capacidade;
    private Integer ingressos_vendidos;
    private Float taxa_ocupacao_percentual;
}
