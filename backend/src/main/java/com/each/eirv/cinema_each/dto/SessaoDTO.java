package com.each.eirv.cinema_each.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SessaoDTO {
    private Long id_sessao;
    private String filme;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate data;
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime horario;
    private Integer sala;
    private String tipo_exibicao;
    private String tipo_audio;
}
