import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ITodo } from "src/app/models/todo.model";
import { TodoApiHelperService } from "../todo.apihelper.mock.service";

@Injectable()
export class AppConfig {

    todoItems: Subject<ITodo[]> = new Subject<ITodo[]>();
    todos: ITodo[] = [];
    constructor(private http: HttpClient,
                private todoApiHelper: TodoApiHelperService) {

    }

    initialize() {
        return this.todoApiHelper.GetTodos().toPromise()
        .then( (res: ITodo[])  => {
            this.todos = res;
        }).catch((error:any)=> {
            console.log(error);
        });
    }

    SetTodos() {
        this.todoItems.next(this.todos);
    }



}