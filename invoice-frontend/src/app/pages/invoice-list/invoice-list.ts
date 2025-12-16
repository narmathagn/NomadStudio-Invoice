import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Invoice } from '../service/invoice';


@Component({
  selector: 'app-invoice-list',
  imports: [DatePipe, CommonModule],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.css',
})
export class InvoiceList {

  invoices: any[] = [];

  constructor(private invoiceService: Invoice) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getInvoices()
      .then((res: any) => {
        this.invoices = res;
      })
      .catch(() => {
        alert('Failed to load invoices');
      });
  }

  
}
