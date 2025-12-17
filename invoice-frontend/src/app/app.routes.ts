import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MainLayout } from './layout/main-layout/main-layout';
import { CreateInvoice } from './pages/create-invoice/create-invoice';
import { InvoiceList } from './pages/invoice-list/invoice-list';
import { CreateClient } from './pages/create-client/create-client';
import { Clients } from './pages/clients/clients';
import { Overview } from './pages/overview/overview';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: '',  component: MainLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      // add more pages here later
      { path: 'invoices', component: CreateInvoice },
      { path: 'listinvoices', component: InvoiceList },
      { path: 'addclient', component: CreateClient },
      { path: 'clients', component: Clients },
      {path:'overview', component:Overview}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
