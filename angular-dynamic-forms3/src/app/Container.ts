import { Data } from "./data-model";

export class Container{
    key:string;
    children:Data[];

    constructor(options: {
        key?: string,
        children?:Data[],
        } = {}) {
      this.key = options.key;
      this.children= options.children;
    }
}