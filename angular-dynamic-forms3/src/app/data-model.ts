export class  Data{
    value:string;
    name:string;
    title:string;
    controlType:string;
    required:boolean;


    constructor(options: {
        value?: string,
        name?: string,
        title?: string,
        controlType?: string,
        required?: boolean,
        } = {}) {
      this.value = options.value;
      this.name = options.name || '';
      this.title = options.title || '';
      this.controlType = options.controlType || '';
      this.required = !!options.required;
    }
  
}