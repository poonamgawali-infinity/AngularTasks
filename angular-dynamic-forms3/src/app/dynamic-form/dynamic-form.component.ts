import { Component, OnInit,Input } from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { Data }              from '../data-model';
import { DataControlService }    from '../DataControlService';
import { Container} from '../Container'

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  
  @Input() formData: Container[] = [];
  form: FormGroup;
  payLoad={};
  ObjectKeys=Object.keys;
 
  constructor(private qcs: DataControlService) {  }
 
  ngOnInit() {
    console.log("form Data 1:",this.formData);
    this.form = this.qcs.toFormGroup(this.formData);
  }
 
  onSubmit() {
    //this.payLoad = JSON.stringify(this.form.value);

    var formData=this.form.value;
  //  console.log("form :",formData);
    let temp_obj={};
    let temp_obj1={};
    let obj={}; 
    let count=0;

    for(let key in formData)
    {
      count++;
     // console.log("key :",key);
        let split=key.split('_');
        let key0=split[0];
        let key1=split[1];

       if(Object.keys(temp_obj).length < 1 ||  Object.keys(obj).length < 1 )
       { 
        temp_obj[key0]=obj;
       // obj[key1]=this.form.value[key];
       }
        if(key0 in temp_obj)
        {
          obj[key1]=this.form.value[key];
       //  console.log("obj :",obj);
            if(Object.keys(formData).length==count){
            temp_obj[key0]=obj;
            temp_obj1=Object.assign(temp_obj1,temp_obj);
            }
          } 
          else
          {
          temp_obj[key0]=obj;
          obj={};
          obj[key1]=this.form.value[key];
          temp_obj1=Object.assign(temp_obj1,temp_obj);
        temp_obj={};
          }
    }
    console.log( "result :",temp_obj1);
    this.payLoad=temp_obj1;
  }

}
