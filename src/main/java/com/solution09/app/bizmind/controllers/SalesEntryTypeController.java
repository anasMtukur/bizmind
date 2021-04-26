package com.solution09.app.bizmind.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.solution09.app.bizmind.models.AccountType;
import com.solution09.app.bizmind.models.SalesEntryType;
import com.solution09.app.bizmind.repository.AccountTypeRepository;
import com.solution09.app.bizmind.repository.SalesEntryTypeRepository;

@RestController
@RequestMapping("/api/sales_entry_types")
public class SalesEntryTypeController {
	@Autowired
	SalesEntryTypeRepository salesEntryTypeRepository;
	
	//@GetMapping("/")
	@RequestMapping(path = "/", method = RequestMethod.GET)
    public List<SalesEntryType> getAll(){
		return salesEntryTypeRepository.findAll();
	}

}
