import { Component, OnInit,Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
 
import { Data }     from '../data-model';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent{

  @Input() data: Data;
  @Input() data1: Data;
  @Input() form: FormGroup;
  ObjectKeys=Object.keys;
  
  constructor(){
   // console.log("data :",this.data);
  }
  get isValid() { 
   // console.log(this.data);
    return this.form.controls[this.data.name].valid; }
}
