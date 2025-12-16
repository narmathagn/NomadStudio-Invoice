import { Component } from '@angular/core';
import { Client } from '../service/client';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients {

  clients: any[] = [];
  loading = true;
  editingClient: any = null;

  constructor(private clientService: Client) {

  }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.loading = true;
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching clients', err);
        this.loading = false;
      }
    });
  }

  editClient(client: any) {
    this.editingClient = { ...client }; // clone object for editing
  }

  saveEdit() {
    if (!this.editingClient) return;

    this.clientService.updateClient(this.editingClient._id, this.editingClient).subscribe({
      next: () => {
        alert('Client updated successfully');
        this.editingClient = null;
        this.fetchClients();
      },
      error: () => {
        alert('Failed to update client');
      }
    });
  }

  cancelEdit() {
    this.editingClient = null;
  }

  deleteClient(id: string) {
    if (!confirm('Are you sure you want to delete this client?')) return;

    this.clientService.deleteClient(id).subscribe({
      next: () => {
        alert('Client deleted successfully');
        this.fetchClients();
      },
      error: () => {
        alert('Failed to delete client');
      }
    });
  }

}
