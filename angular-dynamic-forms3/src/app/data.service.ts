import { Injectable } from '@angular/core';
import { Data }     from './data-model';
// import { StringData }  from './StringData';
// import { IntegerData }  from './IntegerData';
// import { PasswordData }  from './PasswordData';
import { TextBoxQuestion }  from './TextboxQuestion';
import { DropdownQuestion}  from './DropdownQuestion';

import { Container} from './Container';
import { JSONTemplate} from './JSONTemplate';
import { JSONData } from './JSONData';

@Injectable()
export class DataService {
dataObject;
dataObject1;

  constructor() {
    this.dataObject=JSONTemplate;
    console.log("JSON Template :",this.dataObject);
    this.dataObject1=JSONData;
    console.log("JSON Data :",this.dataObject1);
   }

  getData() {
    let questions: Data[]=[];
    let temp_obj:Data[]=[];
    let obj:Container[]=[];

    for(let key in this.dataObject.components)               
    {
      //console.log("key :",key);
    
      let value=this.dataObject.components[key];
      let value1=this.dataObject1.components[key];
     
      
      for(let i=0;i< value['fields'].length;i++)
      {
       
        let field=value['fields'][i];
        console.log("options :",field.options);
      
        field.value=value1[field.name];
       
        if(field.type=='string')
        {
          
          questions[i]= new TextBoxQuestion({
            value: field.value,
            name: field.name,
            title: field.title,
            controlType:'textbox',
            required: field.required,
          })
         // console.log("array :",questions);
          temp_obj=temp_obj.concat( questions[i]);
          
       //   Object.assign(temp_obj,questions[i]);
        }
        else if(field.type=='integer' ){
          questions[i]= new TextBoxQuestion({
            value: field.value,
            name: field.name,
            title: field.title,
            controlType:'number',
            required: field.required,
          })
         // console.log("array :",questions);
          temp_obj=temp_obj.concat( questions[i]);
        }
        else if(field.type=='password'){
          questions[i]= new TextBoxQuestion({
            value: field.value,
            name: field.name,
            title: field.title,
            controlType:'password',
            required: field.required,
          })
         // console.log("array :",questions);
          temp_obj=temp_obj.concat( questions[i]);
        }
        else if(field.type=='dropdown')
        {
          questions[i]= new DropdownQuestion({
            value: field.value,
            options:field.options,
                name: field.name,
                title: field.title,
                controlType:'select',
                required: field.required,
              })
             temp_obj=temp_obj.concat( questions[i]);
        }
                   
      }//fields for
    //  console.log(typeof(temp_obj));
    obj.push(new Container({key:key,children:temp_obj}));    
    temp_obj=[];
    }//for key

    //console.log("container obj :",obj);
   
    return obj;
  }//getData


}





// getData() {

//   let questions= [
//     {
//        'title':'database',
//        'fields': [
//            new StringData({
//               value: 'test',
//               name: 'host',
//               title: 'Host',
//               required: true,
//             }),
//             new IntegerData({
//               value: '8000',
//               name: 'port',
//               title: 'Port',
//               required: true,
//             }),
      
//             new StringData({
//               value: 'test',
//               name: 'username',
//               title: 'Username'
//             }),
      
//             new PasswordData({
//               value: 'test',
//               name: 'password',
//               title: 'Password'
//             })
//           ]
//     },
//     {
//       'title':'nso',
//       'fields': [
//           new StringData({
//              value: 'test',
//              name: 'host',
//              title: 'Host',
//              required: true,
//            }),
//            new IntegerData({
//              value: '8000',
//              name: 'port',
//              title: 'Port',
//              required: true,
//            }),
     
//            new StringData({
//              value: 'test',
//              name: 'username',
//              title: 'Username'
//            }),
     
//            new PasswordData({
//              value: 'test',
//              name: 'password',
//              title: 'Password'
//            })
//          ]
//     }

//   ]

//   return questions;
// }//getData