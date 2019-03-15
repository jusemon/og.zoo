import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'security', loadChildren: './zoo/security/security.module#SecurityModule' },
  { path: 'params', loadChildren: './zoo/params/params.module#ParamsModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
