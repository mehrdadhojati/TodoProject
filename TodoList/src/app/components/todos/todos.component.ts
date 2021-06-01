import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ITodo } from 'src/app/models/todo.model';
import { TodoApiHelperService } from 'src/app/services/todo.apihelper.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: ITodo[] = [];

  todoAddForm: FormGroup;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoAddForm = new FormGroup({
      'title': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.todoService.AddTodo(this.todoAddForm.get('title').value);
    //this.todoAddForm.reset();
  }


}
