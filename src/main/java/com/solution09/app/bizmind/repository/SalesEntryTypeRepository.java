package com.solution09.app.bizmind.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.solution09.app.bizmind.models.AccountType;
import com.solution09.app.bizmind.models.SalesEntryType;


public interface SalesEntryTypeRepository  extends MongoRepository<SalesEntryType, String>{

	SalesEntryType findByReadableName(String readableName);
	SalesEntryType findByName(String name);

}