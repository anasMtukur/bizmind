package com.solution09.app.bizmind.controllers;

import java.security.Principal;
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

import com.solution09.app.bizmind.models.Sales;
import com.solution09.app.bizmind.models.SalesEntry;
import com.solution09.app.bizmind.models.SalesEntryType;
import com.solution09.app.bizmind.models.TransactionCategory;
import com.solution09.app.bizmind.models.User;
import com.solution09.app.bizmind.payload.request.SalesEntryPayload;
import com.solution09.app.bizmind.repository.SalesEntryRepository;
import com.solution09.app.bizmind.repository.SalesEntryTypeRepository;
import com.solution09.app.bizmind.repository.SalesRepository;
import com.solution09.app.bizmind.repository.TransactionCategoryRepository;
import com.solution09.app.bizmind.repository.UserRepository;

@RestController
@RequestMapping("/api/sales-entry")
public class SalesEntryController {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	TransactionCategoryRepository transactionCategoryRepository;
	
	@Autowired
	SalesEntryRepository salesEntryRepository;
	
	@Autowired
	SalesEntryTypeRepository salesEntryTypeRepository;
	
	@Autowired
	SalesRepository salesRepository;
	
	@GetMapping("/single/{entryid}")
    public SalesEntry getUserTransactionDetails(Principal principal, @PathVariable("entryid") String entryId) throws Exception{
		Optional <SalesEntry> optSales = salesEntryRepository.findById(entryId);
		if(!optSales.isPresent()) {
			throw new Exception( "The transaction is not found." );
		}
		
		return optSales.get();
	}
	
	@PostMapping("/")
	public ResponseEntity<?> createTransaction(@RequestBody SalesEntryPayload payload, Principal principal) throws Exception{
		Optional<User> checkUser = userRepository.findByUsername( principal.getName() );
		System.out.println(payload.getEntryType());
		SalesEntryType entryType = salesEntryTypeRepository.findByName(payload.getEntryType());
		Optional<Sales> optSales = salesRepository.findById(payload.getSales());
		SalesEntry newEntry = new SalesEntry();
		
		if(entryType == null) {
			throw new Exception( "The entry type selected is not available." );
		}
		
		if(!optSales.isPresent()) {
			throw new Exception( "The account cannot be found." );
		}
		
		if(checkUser.isPresent()) {
			SalesEntry salesEntry = new SalesEntry();
			salesEntry.setAmount(payload.getAmount());
			salesEntry.setTitle(payload.getTitle());
			salesEntry.setNote(payload.getNote());
			salesEntry.setEntryType(entryType);
			salesEntry.setCategory(payload.getCategory());
			salesEntry.setSales(optSales.get());
			newEntry = salesEntryRepository.save(salesEntry);
		}
		return ResponseEntity.status(HttpStatus.OK).body(newEntry);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateTransaction(@RequestBody SalesEntry payload, Principal principal) throws Exception{
		Optional<User> checkUser = userRepository.findByUsername( principal.getName() );
		SalesEntry newEntry = new SalesEntry();
		Optional<SalesEntry> optEntry = salesEntryRepository.findById(payload.getId());
		
		if(!optEntry.isPresent()) {
			throw new Exception( "The transaction is not found." );
		}
		
		if(checkUser.isPresent()) {
			newEntry = salesEntryRepository.save(payload);
		}
		return ResponseEntity.status(HttpStatus.OK).body(newEntry);
	}
	
	@DeleteMapping("/{entryid}")
    public ResponseEntity<?> deleteAccount(Principal principal, @PathVariable("entryid") String entryId){
		Optional<SalesEntry> optSale = salesEntryRepository.findById(entryId);
		if(optSale.isPresent()) {
			salesEntryRepository.delete(optSale.get());
		}
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("");
	}
}
