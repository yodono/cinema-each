package com.each.eirv.cinema_each.service;

import com.each.eirv.cinema_each.mapper.CakeMapper;
import com.each.eirv.cinema_each.model.Cake;
import com.each.eirv.cinema_each.repository.CakeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CakeService {

	private final CakeRepository cakeRepository;
	private final CakeMapper cakeMapper;

	public Cake getCake() {
		return cakeMapper.toModel(this.cakeRepository.getCake());
	}
}