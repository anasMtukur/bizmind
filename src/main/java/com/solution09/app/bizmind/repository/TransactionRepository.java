package com.solution09.app.bizmind.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.solution09.app.bizmind.models.Account;
import com.solution09.app.bizmind.models.Transaction;

public interface TransactionRepository  extends MongoRepository<Transaction, String>{
	List<Transaction> findAllByAccount(Account account);
}
