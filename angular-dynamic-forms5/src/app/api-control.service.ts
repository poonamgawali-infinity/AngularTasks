import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Inject} from '@angular/core';
import {PageEvent} from '@angular/material';
import { stringify } from 'query-string';
import { Observable } from 'rxjs/Observable';
import {debounceTime} from "rxjs/operator/debounceTime"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
//import {Rx} from 'rxjs/Rx';
@Injectable()
export class ApiControlService {


  url:string = 'http://localhost:4000';
  private options: RequestOptions;
    private apiPrefix: string;
    private apiEndpoint: string;

    constructor(
      private http:HttpClient) {
        this.options=new RequestOptions();
      }  
  getData(){
    return this.http.get(this.url+'/getData');
  }

  saveData(post){
   // console.log("post data:",post);
    return this.http.post(this.url+'/saveData',post);
  }

  deleteData(id) {
   // console.log("delete data",id);
    return this.http.get(this.url+ "/deleteData/" +id);
  }

  updateData(post,id) {
    console.log("update data",post);
    return this.http.put(this.url+'/updateData/'+id,post);
  }
  
  public search(pageIndex,pageSize,filterValue):any{
   return this.http.get('http://localhost:4000/getData2/'+pageIndex+'/'+pageSize+'/'+filterValue);
  }
  
  public sortData(colName,direction,data:any[]){
      console.log("colName:",colName," Direction:",direction," Data:",data);
      var obj={'colName':colName,'direction':direction,'data':data}
      return this.http.post('http://localhost:4000/sortData',obj);
  }
  search1(pageIndex,pageSize,terms) {
    return Observable.fromEvent(terms, 'keyup')
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(pageIndex,pageSize,term));
  }

  searchEntries(pageIndex,pageSize,term) {
    return this.http
        .get(this.url + "/getData2/"+pageIndex+'/'+pageSize+'/'+term)
        .map(res => {
          console.log("search result :",res)
        });
  }

}