import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Invoice } from '../service/invoice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-invoice',
  standalone: true,                // ✅ REQUIRED
  imports: [CommonModule, FormsModule], 
  templateUrl: './create-invoice.html',
  styleUrl: './create-invoice.css',
})
export class CreateInvoice {

  invoice = {
    userName: '',
    phoneNumber: '',
    services: [
      {
        serviceType: '',
        quantity: 1,
        pricePerUnit: 0,
        amountCharged: 0,
        notes: ''
      }
    ],
    totalAmount: 0,
    receivedAmount: 0,
    balanceAmount: 0,
    generalNotes: '',
    ownerDetails: {
      companyName: 'Nomad Studio Pvt Ltd',
      ownerName: 'Suriya',
      phoneNumber: '9999999999',
      address: 'Dharapuram Road, Oddanchatram-624619, Tamil Nadu',
    }
  };

  constructor(
    private invoiceService: Invoice,
    private router: Router
  ) {}

  addService() {
    this.invoice.services.push({
      serviceType: '',
      quantity: 1,
      pricePerUnit: 0,
      amountCharged: 0,
      notes: ''
    });
  }

  removeService(index: number) {
    this.invoice.services.splice(index, 1);
    this.recalculate();
  }

  recalculate() {
    // service-wise calculation
    this.invoice.services.forEach(s => {
      s.amountCharged =
        (Number(s.quantity) || 0) * (Number(s.pricePerUnit) || 0);
    });

    // total
    this.invoice.totalAmount = this.invoice.services.reduce(
      (sum, s) => sum + s.amountCharged,
      0
    );

    // balance
    this.invoice.balanceAmount =
      this.invoice.totalAmount - (Number(this.invoice.receivedAmount) || 0);
  }

  saveInvoice() {
    this.invoiceService.createInvoice(this.invoice)
      .then(() => {
        alert('Invoice saved successfully');
      })
      .catch(() => {
        alert('Failed to save invoice');
      });
  }

  clearInvoice() {
    this.invoice.userName = '';
    this.invoice.phoneNumber = '';
    this.invoice.services = [
      {
        serviceType: '',
        quantity: 1,
        pricePerUnit: 0,
        amountCharged: 0,
        notes: ''
      }
    ];
    this.invoice.totalAmount = 0;
    this.invoice.receivedAmount = 0;
    this.invoice.balanceAmount = 0;
    this.invoice.generalNotes = '';
  }

  goToList() {
    this.router.navigate(['/listinvoices']);
  }
}
