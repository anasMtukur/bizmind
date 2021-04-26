package com.solution09.app.bizmind.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sales_entry_type")
public class SalesEntryType {
	@Id
	private String id;
	private SalesEntryTypeName name;
	private String readableName;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public SalesEntryTypeName getName() {
		return name;
	}
	public void setName(SalesEntryTypeName name) {
		this.name = name;
	}
	public String getReadableName() {
		return readableName;
	}
	public void setReadableName(String readableName) {
		this.readableName = readableName;
	}
}
