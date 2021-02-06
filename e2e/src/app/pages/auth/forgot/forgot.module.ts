import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPageRoutingModule } from './forgot-routing.module';

import { ForgotPage } from './forgot.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPageRoutingModule
  ],
  declarations: [ForgotPage]
})
export class ForgotPageModule {}
