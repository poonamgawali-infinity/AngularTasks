import { Data} from './data-model';
import { Container} from './Container'
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class DataControlService{
    constructor(){}

    toFormGroup(formData: Container[] ) {
        let group: any = {};
        
        formData.forEach(data => {
          //console.log("datacontrolservice",data.children);
          //console.log("datacontrolservice:",data.key);
          for(let i=0;i<Object.keys(data.children).length;i++){
            // console.log(data.children[i]);
             group[data.key+'_'+data.children[i].name] = data.children[i].required ? 
             new FormControl(data.children[i].value || '', Validators.required): new FormControl(data.children[i].value ||'');
          }
         
        });

        console.log("datacontrolservice form controls :",group);
        return new FormGroup(group);
      }

}