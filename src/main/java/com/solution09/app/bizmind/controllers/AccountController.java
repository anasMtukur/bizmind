package com.solution09.app.bizmind.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

import com.solution09.app.bizmind.repository.AccountRepository;
import com.solution09.app.bizmind.repository.AccountTypeRepository;
import com.solution09.app.bizmind.repository.CurrencyRepository;
import com.solution09.app.bizmind.repository.TransactionCategoryRepository;
import com.solution09.app.bizmind.repository.TransactionRepository;
import com.solution09.app.bizmind.repository.TransactionTypeRepository;
import com.solution09.app.bizmind.repository.UserRepository;

import com.solution09.app.bizmind.models.Account;
import com.solution09.app.bizmind.models.AccountType;
import com.solution09.app.bizmind.models.Currency;
import com.solution09.app.bizmind.models.Transaction;
import com.solution09.app.bizmind.models.User;
import com.solution09.app.bizmind.payload.request.AccountPayload;
import com.solution09.app.bizmind.payload.response.AccountDetailsPayload;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	AccountRepository accountRepository;
	
	@Autowired
	AccountTypeRepository accountTypeRepository;
	
	@Autowired
	CurrencyRepository currencyRepository;
	
	@Autowired
	TransactionRepository transactionRepository;
	
	@Autowired
	TransactionTypeRepository transactionTypeRepository;
	
	@Autowired
	TransactionCategoryRepository transactionCategoryRepository;
	
	@GetMapping("/")
    public List<Account> getUserAccounts(Principal principal){
		List<Account> userAccounts = new ArrayList<Account>();
		Optional<User> checkUser = userRepository.findByUsername( principal.getName() );
		if(checkUser.isPresent()) {
			userAccounts = accountRepository.findAllByUser(checkUser.get());
		}
		
		return userAccounts;
	}
	
	@GetMapping("/{acccountid}")
    public AccountDetailsPayload getAccountDetails(Principal principal, @PathVariable("acccountid") String accountId){
		AccountDetailsPayload payload = new AccountDetailsPayload();
		Optional<Account> acc = accountRepository.findById(accountId);
		if(acc.isPresent()) {
			payload.setAccount(acc.get());
			List<Transaction> accountTransactions = transactionRepository.findAllByAccount(acc.get());
			payload.setTransactions(accountTransactions);
		}
		return payload;
	}
	
	@PostMapping("/")
	public ResponseEntity<?> createAccount(@RequestBody AccountPayload payload, Principal principal) throws Exception{
		Optional<User> checkUser = userRepository.findByUsername( principal.getName() );
		AccountType accountType = accountTypeRepository.findByName(payload.getType());
		Currency currency = currencyRepository.findByUnit(payload.getCurrency());
		
		Account newAccount = new Account();
		if(accountType == null) {
			throw new Exception( "The account type selected is not available." );
		}
		
		if(currency == null) {
			throw new Exception( "The account currency selected is not available." );
		}
		
		if(checkUser.isPresent()) {
			Account account = new Account();
			account.setName(payload.getName());
			account.setType(accountType);
			account.setCurrency(currency);
			account.setDescription(payload.getDescription());
			account.setUser(checkUser.get());
			newAccount = accountRepository.save(account);
			if(newAccount != null) {
				//System.out.println("New Transaction " + payload.getStartBalance());
				Transaction trx = new Transaction();
				trx.setTitle("Opening Balance");
				trx.setNote("Opening account balance");
				trx.setAccount(newAccount);
				trx.setAmount(payload.getStartBalance());
				trx.setCategory(transactionCategoryRepository.findByName("CASH"));
				trx.setTransactionType(transactionTypeRepository.findByName("CREDIT"));
				transactionRepository.save(trx);
			}
		}
		return ResponseEntity.status(HttpStatus.OK).body(newAccount);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateAccount(@RequestBody Account payload, Principal principal) throws Exception{
		Optional<User> checkUser = userRepository.findByUsername( principal.getName() );
		AccountType accountType = accountTypeRepository.findByName(payload.getType().getName().toString());
		Optional<Account> acc = accountRepository.findById(payload.getId());
		Account editedAccount = new Account();
		if(accountType == null) {
			throw new Exception( "The account type selected is not available." );
		}
		
		if(checkUser.isPresent()) {
			Account account = acc.get();
			account.setCurrency(payload.getCurrency());
			account.setName(payload.getName());
			account.setType(accountType);
			account.setDescription(payload.getDescription());
			editedAccount = accountRepository.save(account);
		}
		return ResponseEntity.status(HttpStatus.OK).body(editedAccount);
	}
	
	@DeleteMapping("/{acccountid}")
    public ResponseEntity<?> deleteAccount(Principal principal, @PathVariable("acccountid") String accountId){
		Optional<Account> acc = accountRepository.findById(accountId);
		if(acc.isPresent()) {
			accountRepository.delete(acc.get());
		}
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("");
	}
	
}
