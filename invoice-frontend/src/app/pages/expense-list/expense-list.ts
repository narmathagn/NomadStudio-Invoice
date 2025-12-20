import { Component, OnInit } from '@angular/core';
import { Expense } from '../service/expense';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseList implements OnInit {

 expenses: any[] = [];
  loading = true;

  constructor(private expenseService: Expense) {}

  async ngOnInit() {
    await this.loadExpenses();
  }

  async loadExpenses() {
    this.loading = true;

    try {
      const res = this.expenseService.getExpenses();

      // ✅ Supports both Promise & Observable
      this.expenses = Array.isArray(res)
        ? res
        : await firstValueFrom(res);

    } catch (err) {
      console.error('Failed to load expenses', err);
      this.expenses = [];
    } finally {
      this.loading = false;
    }
  }

}
