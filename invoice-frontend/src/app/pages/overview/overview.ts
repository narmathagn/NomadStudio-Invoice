import { Component, OnInit } from '@angular/core';
import { Invoice } from '../service/invoice';
import { CommonModule } from '@angular/common';
import { Client } from '../service/client';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-overview',
  imports: [CommonModule,FormsModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview implements OnInit {

  // ================= EXISTING =================
  totalClients = 0;
  totalIncome = 0;
  totalReceived = 0;
  totalBalance = 0;
  loading = true;

  expenseAmount: number = 0;
expenseReason: string = '';

  constructor(
    private invoiceService: Invoice,
    private clientService: Client
  ) {}

  // ================= NEW (FILTER SUPPORT) =================
  selectedFilter: 'today' | 'week' | 'month' | 'year' = 'today';

  fromDate: string | null = null;
  toDate: string | null = null;

  allInvoices: any[] = [];   // backup (DO NOT REMOVE)

  // ================= LIFECYCLE =================
  ngOnInit(): void {
    this.loadDashboardData();
  }

  // ================= EXISTING METHOD (UNCHANGED LOGIC) =================
  async loadDashboardData() {
    try {
      // Clients (Observable → Promise)
      const clients: any[] = await firstValueFrom(
        this.clientService.getAllClients()
      );

      // Invoices (Promise)
      const invoices: any[] = await this.invoiceService.getInvoices();

      this.allInvoices = invoices; // backup

      this.totalClients = clients.length;

      this.applyPresetFilter(); // 🔹 APPLY DEFAULT FILTER

      this.loading = false;

    } catch (err) {
      console.error('Failed to load overview data', err);
      this.loading = false;
    }
  }

  // ================= PRESET FILTER (Today / Week / Month / Year) =================
  applyPresetFilter() {
    this.fromDate = null;
    this.toDate = null;

    const now = new Date();
    let startDate = new Date();

    switch (this.selectedFilter) {
  case 'today':
    startDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    break;

  case 'week':
    startDate = this.getStartOfWeek(now);
    break;

  case 'month':
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    break;

  case 'year':
    // 🔥 FIX: include previous year invoices
    startDate = this.getStartOfFinancialYear(now);
    break;
}
    this.filterInvoicesByDateRange(startDate, now);
  }

  // ================= CUSTOM DATE FILTER (CALENDAR) =================
  applyCustomDateFilter() {
    if (!this.fromDate || !this.toDate) return;

    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);

    // normalize end date (include full day)
    to.setHours(23, 59, 59, 999);

    this.filterInvoicesByDateRange(from, to);
  }

  // ================= DATE HELPERS (ADDED) =================
getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 (Sun) → 6 (Sat)
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  return new Date(d.setDate(diff));
}

getStartOfFinancialYear(date: Date): Date {
  // Financial year starts April 1 (India)
  const year = date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1;
  return new Date(year, 3, 1);
}

  // ================= COMMON FILTER METHOD =================
  filterInvoicesByDateRange(from: Date, to: Date) {
    const filteredInvoices = this.allInvoices.filter((inv: any) => {
      const created = new Date(inv.createdAt);
      return created >= from && created <= to;
    });

    this.totalIncome = filteredInvoices.reduce(
      (sum: number, i: any) => sum + (i.totalAmount || 0),
      0
    );

    this.totalReceived = filteredInvoices.reduce(
      (sum: number, i: any) => sum + (i.receivedAmount || 0),
      0
    );

    this.totalBalance = filteredInvoices.reduce(
      (sum: number, i: any) => sum + (i.balanceAmount || 0),
      0
    );
  }
}
