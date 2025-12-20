import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Expense {

  private baseUrl='http://localhost:5000/api/expenses';

  constructor(private http:HttpClient) {}

  addExpense(playload: { amount: number; reason: string; }) {
    return this.http.post(`${this.baseUrl}`, playload);
  }

  getExpenses() {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
