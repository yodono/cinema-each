package com.each.eirv.cinema_each.mapper;

import com.each.eirv.cinema_each.entity.CakeEntity;
import com.each.eirv.cinema_each.model.Cake;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CakeMapper {

    Cake toModel(CakeEntity cake);
}
