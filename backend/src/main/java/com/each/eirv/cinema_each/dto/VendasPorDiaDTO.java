package com.each.eirv.cinema_each.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VendasPorDiaDTO {
    private String diaSemana;
    private Integer ingressosVendidos;
    private Integer inteiras;
    private Integer meias;
}