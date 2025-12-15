import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'dashboard', component: Dashboard }

      // add more pages here later
      // { path: 'clients', component: ClientsComponent }
      // { path: 'invoices', component: InvoicesComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
