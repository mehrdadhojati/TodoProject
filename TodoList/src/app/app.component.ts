import { Component, OnInit } from '@angular/core';
import { AppConfig } from './services/app-initializer/app.initializer.service';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private todoService: TodoService,
              private appConfig: AppConfig) {
        
      
  }

  ngOnInit() {
    this.appConfig.SetTodos();

    //get Todos (before Use app Initializer)
    //this.todoService.GetTodos();
  }
}
