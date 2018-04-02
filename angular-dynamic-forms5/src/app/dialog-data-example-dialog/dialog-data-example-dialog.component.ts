import { Component, OnInit,Inject,Output,EventEmitter,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import {  FormControl,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions, ResponseType } from '@angular/http';


@Component({
  selector: 'app-dialog-data-example-dialog',
  templateUrl: './dialog-data-example-dialog.component.html',
  styleUrls: ['./dialog-data-example-dialog.component.css']
})
export class DialogDataExampleDialogComponent implements OnInit {

  form: FormGroup;
  @ViewChild('fileInput') fileInput;
  @Output() onAdd = new EventEmitter<any>(true);
file:any;

  filedata:any;

  constructor( public dialogRef: MatDialogRef<DialogDataExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public fb: FormBuilder,public http:HttpClient) {
      this.form = new FormGroup ({
        first_name: new FormControl(),
        last_name: new FormControl(),
      });
  }

	fileEvent(e){
    this.filedata=e.target.files[0];
    console.log("file data :",this.filedata);
  //  console.log(e);
  }
  
    ngOnInit() {
    }
    
    onNoClick(): void {

      
      let formdata = new FormData();
      
      formdata.append("avatar",this.filedata);
    //  console.log("form data:",formdata);
      //  let responseType={ResponseType:text};
        
      this.http.post("http://localhost:4000/uploading",formdata)
      .subscribe((res)=>{
     //   console.log("image rep :",res['data']);
     // this.form.get('file1').value=res;
     // this.form.controls['avatar'].setValue(res['data']);
      this.file=res['data'];
       // console.log("form control :",this.form);
       var obj={first_name:this.form.value.first_name,last_name:this.form.value.last_name,
      avatar:this.file}
      //console.log("obj :",obj);
      this.onAdd.emit(obj);
      this.dialogRef.close(obj);
      });

      
    //  this.onAdd.emit(this.form.value);
     // this.dialogRef.close(this.form.value);

    
    }

  


}
