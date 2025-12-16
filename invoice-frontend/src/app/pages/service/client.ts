import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Client {

  private apiUrl = 'http://localhost:5000/api/users';
  private platformId = inject(PLATFORM_ID);

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  createClient(client: any) {
    const token = this.getToken();

    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(client)
    }).then(res => res.json());
  }

}
