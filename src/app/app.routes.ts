import { Routes } from '@angular/router';
import { LoginComponent } from './component/features/login/login.component';
import { RegisterComponent } from './component/features/register/register.component';
import { AdminComponent } from './component/features/admin/admin.component';
import { EnteReguladorComponent } from './component/features/ente-regulador/ente-regulador.component';
import { AuthGuard } from './guards/auth.guard';
import { StartWindowComponent } from './component/features/home/start-window/start-window.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { role: 'Admin' },
  },
  {
    path: 'ente-regulador',
    component: EnteReguladorComponent,
    canActivate: [AuthGuard],
    data: { role: 'Ente Regulador' },
  },
  { path: '', component: StartWindowComponent }, 
];
