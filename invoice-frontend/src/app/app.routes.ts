import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
