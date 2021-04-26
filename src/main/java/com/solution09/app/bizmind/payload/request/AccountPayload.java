package com.solution09.app.bizmind.payload.request;

import javax.validation.constraints.NotBlank;

public class AccountPayload {
	@NotBlank
	private String name;

	@NotBlank
	private String description;
	
	@NotBlank
	private String type;
	
	@NotBlank
	private String currency;
	
	@NotBlank
	private double startBalance;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getType() {
		return type;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public void setType(String type) {
		this.type = type;
	}

	public double getStartBalance() {
		return startBalance;
	}

	public void setStartBalance(double startBalance) {
		this.startBalance = startBalance;
	}
}
