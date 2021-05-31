import { Component, OnInit } from '@angular/core';
import { Todo } from './models/todo.model';
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

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    //get Todos
    this.todoService.GetTodos();
  }
}
