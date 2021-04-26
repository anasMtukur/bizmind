package com.solution09.app.bizmind.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "transaction_type")
public class TransactionType {
	@Id
	private String id;
	
	private TransactionTypeName name;
	
	private String readableName;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public TransactionTypeName getName() {
		return name;
	}

	public void setName(TransactionTypeName name) {
		this.name = name;
	}

	public String getReadableName() {
		return readableName;
	}

	public void setReadableName(String readableName) {
		this.readableName = readableName;
	}
}
