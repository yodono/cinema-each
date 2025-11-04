package com.each.eirv.cinema_each.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BilheteriaDTO {
    private String titulo;
    private Float arrecadacao_total;
    private Integer ingressos_vendidos;
}
