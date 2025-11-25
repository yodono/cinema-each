package com.each.eirv.cinema_each.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientesRankingDTO {
    private Long id_cliente;
    private String nome;
    private String cpf;
    private Long total_produtos_comprados;
}