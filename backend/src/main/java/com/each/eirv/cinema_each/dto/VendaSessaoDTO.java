package com.each.eirv.cinema_each.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VendaSessaoDTO {
    private Integer id_sessao;
    private String filme;
    private Integer total_vendidos;
    private Integer inteiras_vendidas;
    private Integer meias_vendidas;
    private Integer total_inteiras_geral;
    private Integer total_meias_geral;
}
