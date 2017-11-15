import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdToolbarModule, MdIconModule, MdMenuModule,MdButtonModule,
  MdInputModule, MdSelectModule, MdOptionModule,
  MdCardModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdToolbarModule, MdIconModule, MdMenuModule, MdButtonModule,
    MdInputModule, MdSelectModule, MdOptionModule, MdCardModule
  ]
})
export class MaterialModule { }