package com.solution09.app.bizmind.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.solution09.app.bizmind.models.TransactionType;


public interface TransactionTypeRepository extends MongoRepository<TransactionType, String>{
	TransactionType findByReadableName(String readableName);
	TransactionType findByName(String name);
}