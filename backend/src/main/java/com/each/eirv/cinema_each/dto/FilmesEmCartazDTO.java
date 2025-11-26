package com.each.eirv.cinema_each.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FilmesEmCartazDTO {
    private String titulo;
    private String sinopse;
    private String genero;
    private String classificacao_etaria;
}
