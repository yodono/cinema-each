package com.each.eirv.cinema_each.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientesResgateRankingDTO {
    private Long id_cliente;
    private String nome;
    private String cpf;
    private Integer total_pontos_resgatados;
}