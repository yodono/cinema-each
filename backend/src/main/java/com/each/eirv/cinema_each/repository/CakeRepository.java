package com.each.eirv.cinema_each.repository;

import com.each.eirv.cinema_each.entity.CakeEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CakeRepository {

	private final JdbcTemplate jdbcTemplate;

	public CakeEntity getCake() {
		List<CakeEntity> query = jdbcTemplate.query(
				"SELECT name FROM cake",
				(rs, rowNum) -> new CakeEntity(rs.getString("name")));

		return query.getFirst();
	}
}