package com.solution09.app.bizmind.payload.request;

import javax.validation.constraints.NotBlank;

import com.solution09.app.bizmind.models.Currency;

public class SalesPayload {
	@NotBlank
	private String title;

	@NotBlank
	private String description;
	
	@NotBlank
	private Currency currency;
	
	@NotBlank
	private double totalAmount;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Currency getCurrency() {
		return currency;
	}

	public void setCurrency(Currency currency) {
		this.currency = currency;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}
}
