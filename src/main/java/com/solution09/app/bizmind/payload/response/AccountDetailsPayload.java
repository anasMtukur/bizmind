package com.solution09.app.bizmind.payload.response;

import java.util.List;

import com.solution09.app.bizmind.models.Account;
import com.solution09.app.bizmind.models.Transaction;

public class AccountDetailsPayload {
	private Account account;
	private List<Transaction> transactions;
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public List<Transaction> getTransactions() {
		return transactions;
	}
	public void setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
	}
}
