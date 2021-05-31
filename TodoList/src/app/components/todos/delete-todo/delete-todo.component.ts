import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.css']
})
export class DeleteTodoComponent implements OnInit {

  initialData: Todo;
  
  constructor(@Inject(MAT_DIALOG_DATA) private data: Todo) { 
    this.initialData = data;
  }

  ngOnInit(): void {
  }

}
