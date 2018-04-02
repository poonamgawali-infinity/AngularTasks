import { Component,Injectable, ElementRef, OnInit,ViewChild,Output,EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material';
import { DialogDataExampleDialogComponent } from './dialog-data-example-dialog/dialog-data-example-dialog.component';
import { ApiControlService } from './api-control.service';
import {DataService} from './data.service';


import {Issue} from './Issue';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import { DialogComponent } from './dialog/dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Rx';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {PageEvent} from '@angular/material';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subject } from 'rxjs/Subject';
import {Sort} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit{
 
  dataObject:any[]=[];
  _id;
  index1;
 
  length :number;
  pageSize:number=3;
  pageSizeOptions = [3,5,10,12];
  pageIndex:number=0;
//  event:PageEvent;
  dataSource = new MatTableDataSource([]);
  displayedColumns = ['id', 'first_name', 'last_name', 'avatar','actions'];
  data1;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter:ElementRef;
  pageEvent: PageEvent;
  results;
  searchTerm$ = new Subject<string>();

  constructor(private http: HttpClient,public dialog: MatDialog,
    private api:ApiControlService, public dataService: DataService){
    // this.api.getData().subscribe(res=>{
    //   console.log("Result :",res);
    //  this.length=Object.keys(res).length;
    // });
    
  }


  sortData(sort: Sort){
  const data=this.dataSource.data;
    if(!sort.active || sort.direction==''){
      this.dataSource.data=data;
    }
    console.log("pageSize :",this.paginator.pageSize)
    let sortedData=this.api.sortData(sort.active,sort.direction,data).subscribe((res)=>{
   //   this.dataSource.data=res as Array<any>;
      this.dataSource = new MatTableDataSource(res as Array<any>);
      this.pageSize=this.paginator.pageSize;
      this.pageIndex=this.paginator.pageIndex;
      this.length=this.paginator.length;
    // this.loadData(this.paginator);
     console.log("sxcdc",res);
    });
    //this.loadData(this.paginator)
  }


  ngOnInit(){
    console.log("sort :",this.sort)

    this.http.get('http://localhost:4000/getData1/'+0+'/'+this.pageSize).subscribe(
     data=>{
       console.log("ngOnInit : server result :",data);
       this.dataSource = new MatTableDataSource(data['data'] as Array<any>);
      // this.dataObject=data['data'] as Array<any>; 
       this.pageSize=data['pageSize'];
       this.pageIndex=data['pageIndex'];
       this.length=data['length'];
       this.data1=this.dataSource.data;
     });
   // this.loadData(this.paginator);
   }

 

  applyFilter(filterValue) {
    console.log("filter value :",filterValue);
    let input = filterValue.toLowerCase(); 
   // console.log("data 1:",this.data1);
    if( input=="")
    {
      this.dataSource.data=this.data1;
    }
    else{

      this.api.search1(this.pageIndex,this.pageSize,filterValue)
      .subscribe(results => {
        //this.results = results.results;
        if(results){
          console.log("rdd",results)
        }
       
      });
      
      // let input$=Observable.fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(50);

      // input$.subscribe((x)=>console.log("hdhcc",x));

      // Observable.fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .subscribe((res) => {
      //   // if (!this.dataSource) {
      //   //   return;
      //   // }
      //  // this.dataSource.filter = this.filter.nativeElement.value;
      //  console.log("filter result :",res['value']);
      // });
      //input
      // this.api.search(this.pageIndex,this.pageSize,filterValue).subscribe((res)=>{
      //   console.log("filter result :",res);
      //   this.dataSource.data=res;
        
      // this.api.search(this.pageIndex,this.pageSize,x).subscribe((res)=>{
      //   console.log("filter result :",res);
      //   this.dataSource.data=res;
      //  // this.dataSource.filter = res;
      // }); 
      //  // this.dataSource.filter = res;
      // });   
    }
  }
  
  add(){
    let dialogRef= this.dialog.open( DialogDataExampleDialogComponent,{
      height:'400px',
      width:'500px'
    })
    const sub = dialogRef.componentInstance.onAdd.subscribe((res) => {
     // console.log("f data :",res);
       this.api.saveData(res).subscribe((result)=>{
         if(result['status']=='success'){
          console.log("record inserted successfully. ",result);
          this.loadData(this.paginator);
         }
         else{
          console.log("insertion failed.");
         }
      }); });
  }//openDialog
  
  delete(data:any){
      this.api.deleteData(data._id).subscribe((res)=>{
        console.log("delete : server result",res);
        if(res['status']=='deleted'){
          this.loadData(this.paginator);
        }
      });
  }

  edit(data:any){
    this._id=data._id;
    //this.index1=this.dataSource.data.indexOf(data);
    let dialogRef= this.dialog.open(EditDialogComponent,{
      height:'400px',
      width:'500px',
      data:{id:data.id,first_name:data.first_name,last_name:data.last_name,avatar:data.avatar}
    });

    dialogRef.afterClosed().subscribe((res) => {
     // console.log('The dialog was closed',res);
      this.api.updateData(res,this._id).subscribe((response)=>{
          console.log("update : server result",response);
          if(response['status']=='success'){
            this.loadData(this.paginator);
             // this.dataSource.data[this.index1]=res;
          }
          else{
              console.log('updation failed');
          }
      });
    });
  }

  openDialog1(data){
    let dialogRef= this.dialog.open(DialogComponent,{
      height:'400px',
      width:'500px',
      data:{id:data.id,first_name:data.first_name,last_name:data.last_name,avatar:data.avatar}
    })
  }//opendialog1

  loadData(event:PageEvent){
    // console.log("on data load pagesize:",event.pageSize);
     this.http.get('http://localhost:4000/getData1/'+event.pageIndex+'/'+event.pageSize).subscribe(
       data=>{
         console.log("on data load server result :",data);
         this.dataSource = new MatTableDataSource(data['data'] as Array<any>);
         this.dataObject=data['data'] as Array<any>; 
         this.pageSize=data['pageSize'];
         this.pageIndex=data['pageIndex'];
         this.length=data['length'];
         this.data1=this.dataSource.data;
       });
   }
}//class


