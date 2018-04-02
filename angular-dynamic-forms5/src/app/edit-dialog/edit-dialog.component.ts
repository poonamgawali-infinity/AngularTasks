import { Component, OnInit,Inject,Output,EventEmitter } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  form:FormGroup;
  @Output() onAdd = new EventEmitter<any>(true);

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public fb:FormBuilder) { 
      this.form=fb.group({
       // id:data.id,
        first_name:data.first_name,
        last_name:data.last_name,
        avatar:data.avatar
      });
    }
    
  ngOnInit() {
  }

  onNoClick(): void {
   // console.log("form value :",this.form.value);
    this.onAdd.emit(this.form.value);
    this.dialogRef.close(this.form.value);
  }

}
