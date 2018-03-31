import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';

  questions: any[];

  constructor(service: DataService) {
    this.questions = service.getData();
    console.log("get data:",this.questions);
  }
}
