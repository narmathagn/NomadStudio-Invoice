import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../service/client';

@Component({
  selector: 'app-create-client',
  standalone: true,                // ✅ REQUIRED
  imports: [CommonModule, FormsModule],
  templateUrl: './create-client.html',
  styleUrl: './create-client.css',
})
export class CreateClient {

  client = {
    userName: '',
    phoneNumber: '',
    emailId: '',
    address: ''
  };
  loading = false;

  constructor(private clientService: Client) { }

  saveClient() {
    this.loading = true;
    this.clientService.createClient(this.client)
      .then(() => {
        alert('Client saved successfully');
        this.loading = false;
        this.resetClient();
      })
      .catch(() => {
        alert('Failed to save client');
        this.loading = false
      });
  }

  resetClient() {
    this.client = {
      userName: '',
      phoneNumber: '',
      emailId: '',
      address: ''
    };
  }


}
