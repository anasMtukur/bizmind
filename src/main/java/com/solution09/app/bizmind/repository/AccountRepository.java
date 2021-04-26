package com.solution09.app.bizmind.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.solution09.app.bizmind.models.User;
import com.solution09.app.bizmind.models.Account;

public interface AccountRepository extends MongoRepository<Account, String>{
	List<Account> findAllByUser(User user);
}
