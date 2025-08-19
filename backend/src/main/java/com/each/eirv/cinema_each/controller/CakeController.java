package com.each.eirv.cinema_each.controller;

import com.each.eirv.cinema_each.service.CakeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cake")
@RequiredArgsConstructor
public class CakeController {

	private final CakeService cakeService;

	@GetMapping
	public String getCake() {
		return this.cakeService.getCake();
	}
}