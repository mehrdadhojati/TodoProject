
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ITodo } from "../models/todo.model";
import {environment} from '../../environments/environment'
import { ITodoApiHelperService } from "./todo.apihelper.interface";

@Injectable({providedIn:'root'})
export class TodoApiHelperService implements ITodoApiHelperService{
    
    constructor(private http: HttpClient) {
    }

    GetTodos() : Observable<any> {
        return this.http.get(environment.hostUrl+'/todos?userId=1');
    }

    AddTodo(todo: ITodo) : Observable<any> {
        return this.http.post(environment.hostUrl+'/todos',todo);
    }

    EditTodo(todo: ITodo) : Observable<any> {
        return this.http.put(environment.hostUrl+'/todos/'+todo.id, todo);
    }

    ChangeTodoStatus(id: number, status: boolean) : Observable<any> {
        return this.http.patch(environment.hostUrl+'/todos/'+id, {completed: status});
    }

    DeleteTodo(id: number) : Observable<any> {
        return this.http.delete(environment.hostUrl+'/todos/'+id);
    }
}