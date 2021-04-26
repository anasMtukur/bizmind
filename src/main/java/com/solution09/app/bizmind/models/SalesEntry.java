package com.solution09.app.bizmind.models;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class SalesEntry {
	@Id
	private String id;
	
	@NotBlank
	@Size(max = 50)
	private String title;
	
	@NotBlank
	@Size(max = 250)
	private String note;
	
	@NotBlank
	@DBRef
	private Sales sales;
	
	@NotBlank
	@DBRef
	private SalesEntryType entryType;
	
	@NotBlank
	@DBRef
	private TransactionCategory category;
	
	@NotBlank
	private double amount;
	
	@CreatedDate
    private Date createdDate;
    
    @LastModifiedDate
    private Date updateDateTime;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Sales getSales() {
		return sales;
	}

	public void setSales(Sales sales) {
		this.sales = sales;
	}

	public SalesEntryType getEntryType() {
		return entryType;
	}

	public void setEntryType(SalesEntryType entryType) {
		this.entryType = entryType;
	}

	public TransactionCategory getCategory() {
		return category;
	}

	public void setCategory(TransactionCategory category) {
		this.category = category;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdateDateTime() {
		return updateDateTime;
	}

	public void setUpdateDateTime(Date updateDateTime) {
		this.updateDateTime = updateDateTime;
	}
}
