import { Component, OnInit } from '@angular/core';
import { Invoice } from '../service/invoice';
import { CommonModule } from '@angular/common';
import { Client } from '../service/client';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';


@Component({
  selector: 'app-overview',
  imports: [CommonModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview implements OnInit {

totalClients = 0;
  totalIncome = 0;
  totalReceived = 0;
  totalBalance = 0;

  loading = true;

  constructor(
    private invoiceService: Invoice,
    private clientService: Client
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

async loadDashboardData() {
  try {
     // ✅ users = Observable → convert
    const clients: any[] = await firstValueFrom(
      this.clientService.getAllClients()
    );

    // ✅ invoices = Promise → await directly
    const invoices: any[] = await this.invoiceService.getInvoices();

    this.totalClients = clients.length;

    this.totalIncome = invoices.reduce(
      (sum: number, i: any) => sum + (i.totalAmount || 0), 0
    );

    this.totalReceived = invoices.reduce(
      (sum: number, i: any) => sum + (i.receivedAmount || 0), 0
    );

    this.totalBalance = invoices.reduce(
      (sum: number, i: any) => sum + (i.balanceAmount || 0), 0
    );

    this.loading = false;

  } catch (err) {
    console.error('Failed to load overview data', err);
    this.loading = false;
  }
}

}

