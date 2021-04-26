package com.solution09.app.bizmind.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "transaction_category")
public class TransactionCategory {
	@Id
	private String id;
	
	private TransactionCategoryName name;
	
	private String readableName;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public TransactionCategoryName getName() {
		return name;
	}

	public void setName(TransactionCategoryName name) {
		this.name = name;
	}

	public String getReadableName() {
		return readableName;
	}

	public void setReadableName(String readableName) {
		this.readableName = readableName;
	}
}
