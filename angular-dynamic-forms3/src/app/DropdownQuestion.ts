import { Data } from './data-model';

export class DropdownQuestion extends Data{
 // controlType = 'dropdown';
  //type: string;
  options: {name: string, value: string}[] = [];
  constructor(options: {} = {}) {
    super(options);
 //   this.type = options['type'] || '';
 this.options = options['options'] || [];
  }
}