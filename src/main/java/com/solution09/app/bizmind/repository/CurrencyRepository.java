package com.solution09.app.bizmind.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.solution09.app.bizmind.models.Currency;

public interface CurrencyRepository extends MongoRepository<Currency, String>{
	Currency findByName(String name);
	
	Currency findByUnit(String unit);
}
