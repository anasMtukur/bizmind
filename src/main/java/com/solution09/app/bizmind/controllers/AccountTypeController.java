package com.solution09.app.bizmind.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.solution09.app.bizmind.models.AccountType;
import com.solution09.app.bizmind.repository.AccountTypeRepository;

@RestController
@RequestMapping("/api/account_types")
public class AccountTypeController {
	@Autowired
	AccountTypeRepository accountTypeRepository;
	
	//@GetMapping("/")
	@RequestMapping(path = "/", method = RequestMethod.GET)
    public List<AccountType> getAll(){
		return accountTypeRepository.findAll();
	}

}
