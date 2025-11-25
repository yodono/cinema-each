package com.each.eirv.cinema_each.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GeneroMensalDTO {
    private Integer ano;
    private Integer mes;
    private String nome_genero;
    private Long total_ingressos;
}
