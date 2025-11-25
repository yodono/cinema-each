package com.each.eirv.cinema_each.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IdadeMediaDTO {
    private String nome; 
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "#") 
    private Long idade_media;
}