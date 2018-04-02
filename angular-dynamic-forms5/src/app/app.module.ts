
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { ApiControlService } from './api-control.service';
import { DialogDataExampleDialogComponent } from './dialog-data-example-dialog/dialog-data-example-dialog.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatSortModule} from '@angular/material/sort';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { DialogComponent } from './dialog/dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    DialogDataExampleDialogComponent,
    DialogComponent,
    EditDialogComponent,
  
  ],
  imports: [
    BrowserModule,HttpClientModule,MatIconModule,MatTableModule,MatPaginatorModule,
    NoopAnimationsModule,MatDialogModule,MatFormFieldModule,MatInputModule,
    MatButtonModule,FormsModule,ReactiveFormsModule,MatGridListModule,MatToolbarModule,
    MatCardModule,MatSortModule,MatProgressSpinnerModule,BrowserAnimationsModule
  ],
  entryComponents: [
    DialogDataExampleDialogComponent,EditDialogComponent,DialogComponent
],
  providers: [ApiControlService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
