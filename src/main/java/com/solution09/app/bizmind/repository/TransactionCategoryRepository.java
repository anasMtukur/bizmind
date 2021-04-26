package com.solution09.app.bizmind.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.solution09.app.bizmind.models.TransactionCategory;

public interface TransactionCategoryRepository extends MongoRepository<TransactionCategory, String>{
	TransactionCategory findByReadableName(String readableName);
	TransactionCategory findByName(String name);
}
