package com.solution09.app.bizmind.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.solution09.app.bizmind.models.Sales;
import com.solution09.app.bizmind.models.SalesEntry;

public interface SalesEntryRepository extends MongoRepository<SalesEntry, String>{
	List<SalesEntry> findAllBySales(Sales sales);
}
