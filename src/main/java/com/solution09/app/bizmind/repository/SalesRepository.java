package com.solution09.app.bizmind.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.solution09.app.bizmind.models.User;
import com.solution09.app.bizmind.models.Sales;

public interface SalesRepository extends MongoRepository<Sales, String>{
	List<Sales> findAllByUser(User user);
}
