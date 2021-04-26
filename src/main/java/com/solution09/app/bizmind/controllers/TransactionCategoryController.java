package com.solution09.app.bizmind.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.solution09.app.bizmind.models.TransactionCategory;
import com.solution09.app.bizmind.repository.TransactionCategoryRepository;

@RestController
@RequestMapping("/api/transaction_categories")
public class TransactionCategoryController {
	@Autowired
	TransactionCategoryRepository transactionCategoryRepository;
	
	@GetMapping("/")
    public List<TransactionCategory> getAll(){
		return transactionCategoryRepository.findAll();
	}
	
	
}
