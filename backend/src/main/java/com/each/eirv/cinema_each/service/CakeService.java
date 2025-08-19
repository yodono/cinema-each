package com.each.eirv.cinema_each.service;

import com.each.eirv.cinema_each.repository.CakeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CakeService {

	private final CakeRepository cakeRepository;

	public String getCake() {
		return this.cakeRepository.getCake();
	}
}