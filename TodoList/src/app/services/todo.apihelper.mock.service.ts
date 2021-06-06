import { Injectable } from "@angular/core";
import { observable, Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { ITodo } from "../models/todo.model";
import { ITodoApiHelperService } from "./todo.apihelper.interface";

@Injectable({providedIn:'root'})
export class TodoApiHelperService implements ITodoApiHelperService {

    todos: ITodo[] = [
        {
            "row":1,
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
          },
          {
            "row":3,
            "userId": 1,
            "id": 2,
            "title": "quis ut nam facilis et officia qui",
            "completed": false
          },
          {
            "row":2,
            "userId": 1,
            "id": 3,
            "title": "fugiat veniam minus",
            "completed": false
          },
          {
            "row":4,
            "userId": 1,
            "id": 4,
            "title": "et porro tempora",
            "completed": true
          },
          {
            "row":5,
            "userId": 1,
            "id": 5,
            "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
            "completed": false
          } 
    ];

    GetTodos(): Observable<any> {
        return of(this.todos);
    }
    AddTodo(todo: ITodo): Observable<any> {
        this.todos.push(todo);
        return of(todo);
    }
    EditTodo(todo: ITodo): Observable<any> {
        let item = this.GetTodoById(todo.id);
        item.title = todo.title;
        return of(todo);
    }
    ChangeTodoStatus(id: number, status: boolean): Observable<any> {
        let item = this.GetTodoById(id);
        item.completed = !status;
        return of(item);
    }

    DeleteTodo(id: number): Observable<any> {
        let item = this.todos.indexOf(this.GetTodoById(id));
        this.todos.splice(item,1);
        return of({});
    }

    private GetTodoById(id: number): ITodo {
        let todo = this.todos.filter((item) => {
            return item.id == id
        });
        return todo[0];
    }
}