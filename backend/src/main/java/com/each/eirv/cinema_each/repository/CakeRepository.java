package com.each.eirv.cinema_each.repository;

import com.each.eirv.cinema_each.model.Cake;
import org.springframework.stereotype.Component;

@Component
public class CakeRepository {

	public Cake getCake() {
		return new Cake();
	}
}