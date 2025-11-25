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
    private String dia_semana;
    private Integer ingressos_vendidos;
    private Integer inteiras;
    private Integer meias;
}