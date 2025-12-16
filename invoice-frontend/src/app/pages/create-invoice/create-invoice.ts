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
        amountCharged: 0,
        notes: ''
      }
    ],
    generalNotes: '',
    totalAmount: 0, // UI preview (backend recalculates)
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
      amountCharged: 0,
      notes: ''
    });
  }

  removeService(index: number) {
    this.invoice.services.splice(index, 1);
  }

  calculateTotal() {
    this.invoice.totalAmount = this.invoice.services.reduce(
      (sum, s) => sum + (Number(s.amountCharged) || 0),
      0
    );
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

 
  buildWhatsappMessage() {
    throw new Error('Method not implemented.');
  }


  clearInvoice() {
    this.invoice.userName = '';
    this.invoice.phoneNumber = '';
    this.invoice.services = [
      { serviceType: '', amountCharged: 0, notes: '' }
    ];
    this.invoice.generalNotes = '';
    this.invoice.totalAmount = 0;
  }

  goToList() {
    this.router.navigate(['/listinvoices']);
  }
}