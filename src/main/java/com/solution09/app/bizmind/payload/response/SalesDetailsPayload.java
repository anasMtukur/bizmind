package com.solution09.app.bizmind.payload.response;

import java.util.List;

import com.solution09.app.bizmind.models.SalesEntry;
import com.solution09.app.bizmind.models.Sales;

public class SalesDetailsPayload {
	private Sales sales;
	private List<SalesEntry> salesEntries;
	
	public Sales getSales() {
		return sales;
	}
	public void setSales(Sales sales) {
		this.sales = sales;
	}
	public List<SalesEntry> getSalesEntries() {
		return salesEntries;
	}
	public void setSalesEntries(List<SalesEntry> salesEntries) {
		this.salesEntries = salesEntries;
	}
}
