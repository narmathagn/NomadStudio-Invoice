import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Invoice } from '../service/invoice';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-invoice-list',
  imports: [DatePipe, FormsModule, CommonModule],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.css',
})

export class InvoiceList implements OnInit {

  invoices: any[] = [];
  paginatedInvoices: any[] = [];
  editingId: string | null = null;
  backupInvoice: any = null;

  pageSize = 5;
  currentPage = 1;
  totalPages = 1;
  selectedCount = 0;


  constructor(
    private invoiceService: Invoice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getInvoices()
      .then((res: any[]) => {
        this.invoices = res.map(inv => ({
          ...inv,
          selected: false
        }));
        this.calculatePagination();
      })
      .catch(() => {
        throw new Error('Failed to load invoices');
      });
  }

  onSelectionChange() {
  this.selectedCount = this.invoices.filter(i => i.selected).length;
}

toggleSelectAll(event: any) {
  const checked = event.target.checked;
  this.paginatedInvoices.forEach(inv => inv.selected = checked);
  this.onSelectionChange();
}

generatePdf() {
  const invoice = this.invoices.find(i => i.selected);
  console.log('Generate PDF for:', invoice);
  // PDF logic will come next
}

exportCsv() {
  const selectedInvoices = this.invoices.filter(i => i.selected);
  console.log('Export CSV for:', selectedInvoices);
  // CSV logic will come next
}

  calculatePagination() {
    this.totalPages = Math.ceil(this.invoices.length / this.pageSize);
    this.updatePage();
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedInvoices = this.invoices.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  toggleAll(event: any) {
    const checked = event.target.checked;
    this.paginatedInvoices.forEach(i => (i.selected = checked));
  }

  
  startEdit(invoice: any) {
    this.editingId = invoice._id;
    this.backupInvoice = JSON.parse(JSON.stringify(invoice)); // deep copy
  }

  cancelEdit() {
    const index = this.invoices.findIndex(i => i._id === this.editingId);
    this.invoices[index] = this.backupInvoice;
    this.editingId = null;
    this.backupInvoice = null;
  }

  recalculateBalance(invoice: any) {
  invoice.balanceAmount =
    invoice.totalAmount - Number(invoice.receivedAmount || 0);
}
  
  updateInvoice(invoice: any) {
  this.invoiceService.updateInvoice(invoice._id, invoice)
    .then(() => {
      this.editingId = null;
      this.backupInvoice = null;
    })
    .catch(() => {
      console.error('Update failed');
    });
}

  deleteInvoice(id: string) {
    if (!confirm('Are you sure you want to delete this invoice?')) return;

    this.invoiceService.deleteInvoice(id)
      .then(() => {
        this.loadInvoices();
      })
      .catch(() => {
        throw new Error('Failed to delete invoice');
      });
  }
}