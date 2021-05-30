import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];

  todoAddForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.todoAddForm = new FormGroup({
      'title': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    alert(this.todoAddForm.get('title').value)
    //alert(this.todoAddForm.get('title').value);
  }


}
