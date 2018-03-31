import { Component, OnInit,Input } from '@angular/core';

import { FormGroup,FormControl } from '@angular/forms';
import { person } from '../person';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  @Input() dataObject;
  objectProps;
  form:FormGroup;
  payload='';

  constructor() { }

  ngOnInit() {
//Object.keys(..) to iterate over all of the properties 
//coming from the @Input and store the result in a member variable objectProps
  
      this.objectProps =
      Object.keys(this.dataObject)
        .map(prop => {
         // console.log(prop);
         // console.log(this.dataObject[prop]);

          return Object.assign({}, { key: prop} , this.dataObject[prop]);
        });

        console.log(this.objectProps);

    // setup the form
    const formGroup = {};
    for(let prop of Object.keys(this.dataObject)) {
     // console.log(prop);
      formGroup[prop] = new FormControl(this.dataObject[prop].value || '');
    }

    console.log(formGroup);
    this.form = new FormGroup(formGroup);

   // this.dataObject=person;

   
   /*
console.log(this.dataObject);
console.log(this.dataObject.components);

this.objectProps=this.dataObject.components;
    let formControlList={};

    for(let key in this.dataObject.components)
    {
      //console.log(this.dataObject.components[key]);
      let value=this.dataObject.components[key];
      console.log(value);
      let field=value.title;
      console.log(field);

      formControlList[field]=new FormControl();
    }

    this.form = new FormGroup(formControlList);
    */

  }//oninit
 
}