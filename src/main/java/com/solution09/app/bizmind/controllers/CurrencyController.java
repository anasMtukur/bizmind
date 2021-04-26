package com.solution09.app.bizmind.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.solution09.app.bizmind.models.Currency;
import com.solution09.app.bizmind.repository.CurrencyRepository;

@RestController
@RequestMapping("/api/currencies")
public class CurrencyController {
	@Autowired
	CurrencyRepository currencyRepository;
	
	@GetMapping("/")
    public List<Currency> getAll(){
		return currencyRepository.findAll();
	}
}
