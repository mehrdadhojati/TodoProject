import { Component, OnInit } from '@angular/core';
import { ITodo } from './models/todo.model';
import { AppConfig } from './services/app-initializer/app.initializer.service';
import { ExceptionHandlerService } from './services/exception.handler.service';
import { TodoApiHelperService } from './services/todo.apihelper.service';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TodoList';

  constructor(private todoService: TodoService,
              private appConfig: AppConfig) {
        
      
  }

  ngOnInit() {
    this.appConfig.SetTodos();

    //get Todos (before Use app Initializer)
    //this.todoService.GetTodos();
  }
}
