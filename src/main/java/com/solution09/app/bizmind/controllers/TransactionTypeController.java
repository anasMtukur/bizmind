package com.solution09.app.bizmind.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.solution09.app.bizmind.models.TransactionType;
import com.solution09.app.bizmind.repository.TransactionTypeRepository;

@RestController
@RequestMapping("/api/transaction_types")
public class TransactionTypeController {
	@Autowired
	TransactionTypeRepository transactionTypeRepository;
	
	@GetMapping("/")
    public List<TransactionType> getAll(){
		return transactionTypeRepository.findAll();
	}
}
