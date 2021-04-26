package com.solution09.app.bizmind.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "account_type")
public class AccountType {
	@Id
	private String id;
	
	private AccountTypeName name;
	
	private String readableName;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public AccountTypeName getName() {
		return name;
	}

	public void setName(AccountTypeName name) {
		this.name = name;
	}

	public String getReadableName() {
		return readableName;
	}

	public void setReadableName(String readableName) {
		this.readableName = readableName;
	}
}
