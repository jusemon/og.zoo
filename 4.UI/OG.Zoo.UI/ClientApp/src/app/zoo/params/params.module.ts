import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  { path: 'animals', loadChildren: () => import('./animals/animals.module').then(m => m.AnimalsModule) },
  { path: 'infirmaries', loadChildren: () => import('./infirmaries/infirmaries.module').then(m => m.InfirmariesModule) },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ParamsModule { }
