import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ITodo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  todoEditForm: FormGroup;
  initialData: ITodo;

  constructor(@Inject(MAT_DIALOG_DATA) private data: ITodo,
              private todoService: TodoService) {
    this.initialData = data;
   }

  ngOnInit(): void {
    this.todoEditForm = new FormGroup({
      'title': new FormControl(this.data.title, Validators.required)
    });
  }

  editItem() {
    let todo = {
      id: this.initialData.id,
      title: this.todoEditForm.get('title').value,
      completed: this.initialData.completed,
      userId: this.initialData.userId
     } as ITodo;
    this.todoService.EditTodo(todo);
  }


}
