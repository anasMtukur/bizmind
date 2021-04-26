package com.solution09.app.bizmind.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.solution09.app.bizmind.models.AccountType;


public interface AccountTypeRepository  extends MongoRepository<AccountType, String>{

	AccountType findByReadableName(String readableName);
	AccountType findByName(String name);

}