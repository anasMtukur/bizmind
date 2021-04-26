package com.solution09.app.bizmind.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.solution09.app.bizmind.models.Account;
import com.solution09.app.bizmind.models.AccountType;
import com.solution09.app.bizmind.models.Transaction;
import com.solution09.app.bizmind.models.TransactionCategory;
import com.solution09.app.bizmind.models.TransactionType;
import com.solution09.app.bizmind.models.User;
import com.solution09.app.bizmind.payload.request.AccountPayload;
import com.solution09.app.bizmind.payload.request.TransactionPayload;
import com.solution09.app.bizmind.repository.AccountRepository;
import com.solution09.app.bizmind.repository.AccountTypeRepository;
import com.solution09.app.bizmind.repository.TransactionCategoryRepository;
import com.solution09.app.bizmind.repository.TransactionRepository;
import com.solution09.app.bizmind.repository.TransactionTypeRepository;
import com.solution09.app.bizmind.repository.UserRepository;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	AccountRepository accountRepository;
	
	@Autowired
	AccountTypeRepository accountTypeRepository;
	
	@Autowired
	TransactionRepository transactionRepository;
	
	@Autowired
	TransactionTypeRepository transactionTypeRepository;
	
	@Autowired
	TransactionCategoryRepository transactionCategoryRepository;
	
	@GetMapping("/")
    public List<Transaction> getUserTransactions(Principal principal){
		
		List<Transaction> allTransactions = transactionRepository.findAll();
		
		return allTransactions;
	}
	
	@GetMapping("/single/{transactionid}")
    public Transaction getUserTransactionDetails(Principal principal, @PathVariable("transactionid") String transactionId) throws Exception{
		Optional <Transaction> optTransaction = transactionRepository.findById(transactionId);
		if(!optTransaction.isPresent()) {
			throw new Exception( "The transaction is not found." );
		}
		
		return optTransaction.get();
	}
	
	@PostMapping("/")
	public ResponseEntity<?> createTransaction(@RequestBody TransactionPayload payload, Principal principal) throws Exception{
		Optional<User> checkUser = userRepository.findByUsername( principal.getName() );
		TransactionType transactionType = transactionTypeRepository.findByName( payload.getType() );
		TransactionCategory transactionCat = transactionCategoryRepository.findByName( payload.getCategory() );
		Optional<Account> optAccount = accountRepository.findById(payload.getAccount());
		Transaction newTransaction = new Transaction();
		if(transactionType == null) {
			throw new Exception( "The transaction type selected is not available." );
		}
		
		if(transactionCat == null) {
			throw new Exception( "The transaction category selected is not available." );
		}
		
		if(!optAccount.isPresent()) {
			throw new Exception( "The account cannot be found." );
		}
		
		if(checkUser.isPresent()) {
			Transaction tranx = new Transaction();
			tranx.setAmount(payload.getAmount());
			tranx.setTitle(payload.getTitle());
			tranx.setNote(payload.getNote());
			tranx.setTransactionType(transactionType);
			tranx.setCategory(transactionCat);
			tranx.setAccount(optAccount.get());
			newTransaction = transactionRepository.save(tranx);
		}
		return ResponseEntity.status(HttpStatus.OK).body(newTransaction);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateTransaction(@RequestBody Transaction payload, Principal principal) throws Exception{
		Optional<User> checkUser = userRepository.findByUsername( principal.getName() );
		TransactionType transactionType = transactionTypeRepository.findByName( payload.getTransactionType().getName().toString() );
		TransactionCategory transactionCat = transactionCategoryRepository.findByName( payload.getCategory().getName().toString() );
		Transaction newTransaction = new Transaction();
		Optional<Transaction> tr = transactionRepository.findById(payload.getId());
		
		if(!tr.isPresent()) {
			throw new Exception( "The transaction is not found." );
		}
		
		if(transactionType == null) {
			throw new Exception( "The transaction type selected is not available." );
		}
		
		if(transactionCat == null) {
			throw new Exception( "The transaction category selected is not available." );
		}
		
		if(checkUser.isPresent()) {
			Transaction tranx = tr.get();
			tranx.setAmount(payload.getAmount());
			tranx.setTitle(payload.getTitle());
			tranx.setNote(payload.getNote());
			tranx.setTransactionType(transactionType);
			tranx.setCategory(transactionCat);
			newTransaction = transactionRepository.save(tranx);
		}
		return ResponseEntity.status(HttpStatus.OK).body(newTransaction);
	}
	
	@DeleteMapping("/{transactionid}")
    public ResponseEntity<?> deleteAccount(Principal principal, @PathVariable("transactionid") String transactionId){
		Optional<Transaction> acc = transactionRepository.findById(transactionId);
		if(acc.isPresent()) {
			transactionRepository.delete(acc.get());
		}
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("");
	}
}
