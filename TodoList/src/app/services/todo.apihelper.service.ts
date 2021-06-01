
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ITodo } from "../models/todo.model";
import {environment} from '../../environments/environment'
import { env } from "process";

@Injectable({providedIn:'root'})
export class TodoApiHelperService {
    
    constructor(private http: HttpClient) {
    }

    GetTodos() {
        return this.http.get(environment.hostUrl+'/todos?userId=1');
    }

    AddTodo(todo: ITodo) : Observable<any> {
        return this.http.post(environment.hostUrl+'/todos',todo);
    }

    EditTodo(todo: ITodo) {
        return this.http.put(environment.hostUrl+'/todos/'+todo.id, todo);
    }

    ChangeTodoStatus(id: number, status: boolean) {
        return this.http.patch(environment.hostUrl+'/todos/'+id, {completed: status});
    }

    DeleteTodo(id: number) {
        return this.http.delete(environment.hostUrl+'/todos/'+id);
    }
}