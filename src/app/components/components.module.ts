import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchInputComponent } from './navbar/search-input/search-input.component';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  declarations: [
    NavbarComponent,
    SidebarComponent,
    SearchInputComponent,
    SearchDialogComponent
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    SearchInputComponent,
    SearchDialogComponent
  ]
})
export class ComponentsModule { }
