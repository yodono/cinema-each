package com.each.eirv.cinema_each.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PublicoEstudantilDTO {
    private String titulo;
    private Integer total_meia_entrada;
    private Integer total_ingressos;
    private Double percentual_meia_entrada;
}