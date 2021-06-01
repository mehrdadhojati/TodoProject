import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ITodo } from "src/app/models/todo.model";
import {environment} from '../../../environments/environment';

@Injectable()
export class AppConfig {

    todoItems: Subject<ITodo[]> = new Subject<ITodo[]>();
    todos: ITodo[] = [];
    constructor(private http: HttpClient) {

    }

    initialize() {
        return this.http.get(environment.hostUrl+'/todos?userId=1')
        .toPromise()
        .then( (res: ITodo[])  => {
            this.todos = res;
            //this.todoItems.next(res);
            //console.log(res);
        }).catch((error:any)=> {
            console.log(error);
        });
    }

    SetTodos() {
        this.todoItems.next(this.todos);
    }



}