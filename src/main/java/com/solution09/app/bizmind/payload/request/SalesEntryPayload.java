package com.solution09.app.bizmind.payload.request;

import com.solution09.app.bizmind.models.SalesEntryType;
import com.solution09.app.bizmind.models.TransactionCategory;

public class SalesEntryPayload {
	private String sales;
	private String title;
	private String note;
	private String entryType;
	private TransactionCategory category;
	private double amount;
	
	
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
	public String getSales() {
		return sales;
	}
	public void setSales(String sales) {
		this.sales = sales;
	}
	public String getEntryType() {
		return entryType;
	}
	public void setEntryType(String entryType) {
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
}
