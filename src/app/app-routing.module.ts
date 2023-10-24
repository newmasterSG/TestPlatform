import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestListComponent } from './test-list/test-list.component';
import { TestDetailComponent } from './test-detail/test-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Auth/auth.guard'

const routes: Routes = [
  { 
    path: '', 
    component: TestListComponent 
  },

  { 
    path: 'test/:id', 
    component: TestDetailComponent, 
    canActivate: [AuthGuard], 
  },

  {
    path: 'login',
    component: LoginComponent,
    outlet: 'popup',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
