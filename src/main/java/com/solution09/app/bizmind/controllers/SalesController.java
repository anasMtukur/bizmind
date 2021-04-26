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

import com.solution09.app.bizmind.models.Sales;
import com.solution09.app.bizmind.models.SalesEntry;
import com.solution09.app.bizmind.models.User;
import com.solution09.app.bizmind.payload.request.SalesPayload;
import com.solution09.app.bizmind.payload.response.SalesDetailsPayload;
import com.solution09.app.bizmind.repository.SalesEntryRepository;
import com.solution09.app.bizmind.repository.SalesRepository;
import com.solution09.app.bizmind.repository.UserRepository;

@RestController
@RequestMapping("/api/sales")
public class SalesController {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	SalesRepository salesRepository;
	
	@Autowired
	SalesEntryRepository salesEntryRepository;
	
	@GetMapping("/")
    public List<Sales> getUserAccounts(Principal principal){
		List<Sales> userSales = new ArrayList<Sales>();
		Optional<User> checkUser = userRepository.findByUsername( principal.getName() );
		if(checkUser.isPresent()) {
			userSales = salesRepository.findAllByUser(checkUser.get());
		}
		
		return userSales;
	}
	
	@GetMapping("/{salesid}")
    public SalesDetailsPayload getAccountDetails(Principal principal, @PathVariable("salesid") String salesId){
		SalesDetailsPayload payload = new SalesDetailsPayload();
		Optional<Sales> sale = salesRepository.findById(salesId);
		if(sale.isPresent()) {
			payload.setSales(sale.get());
			List<SalesEntry> salesEntries = salesEntryRepository.findAllBySales(sale.get());
			payload.setSalesEntries(salesEntries);
		}
		return payload;
	}
	
	@PostMapping("/")
	public ResponseEntity<?> createSales(@RequestBody SalesPayload payload, Principal principal) throws Exception{
		Optional<User> checkUser = userRepository.findByUsername( principal.getName() );
		
		Sales newSale = new Sales();
		if(checkUser.isPresent()) {
			Sales sale = new Sales();
			sale.setTitle(payload.getTitle());
			sale.setCurrency(payload.getCurrency());
			sale.setDescription(payload.getDescription());
			sale.setTotalAmount(payload.getTotalAmount());
			sale.setUser(checkUser.get());
			newSale = salesRepository.save(sale);
		}
		return ResponseEntity.status(HttpStatus.OK).body(newSale);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateAccount(@RequestBody Sales payload, Principal principal) throws Exception{
		Optional<User> checkUser = userRepository.findByUsername( principal.getName() );
		Optional<Sales> sale = salesRepository.findById(payload.getId());
		
		Sales editedSales = new Sales();
		if(checkUser.isPresent()) {
			Sales sales = sale.get();
			sales.setCurrency(payload.getCurrency());
			sales.setTitle(payload.getTitle());
			sales.setDescription(payload.getDescription());
			sales.setTotalAmount(payload.getTotalAmount());
			editedSales = salesRepository.save(sales);
		}
		return ResponseEntity.status(HttpStatus.OK).body(editedSales);
	}
	
	@DeleteMapping("/{salesid}")
    public ResponseEntity<?> deleteAccount(Principal principal, @PathVariable("salesid") String salesId){
		Optional<Sales> sale = salesRepository.findById(salesId);
		if(sale.isPresent()) {
			salesRepository.delete(sale.get());
		}
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("");
	}

}
