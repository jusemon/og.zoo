import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfirmariesComponent } from './infirmaries.component';
import { InfirmariesListComponent } from './infirmaries-list/infirmaries-list.component';
import { InfirmaryComponent } from './infirmary/infirmary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [InfirmariesComponent, InfirmariesListComponent, InfirmaryComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class InfirmariesModule { }
