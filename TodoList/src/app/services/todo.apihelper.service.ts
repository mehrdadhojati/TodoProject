
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Todo } from "../models/todo.model";
import {environment} from '../../environments/environment'
import { env } from "process";

@Injectable({providedIn:'root'})
export class TodoApiHelperService {
    
    constructor(private http: HttpClient) {
    }

    GetTodos() {
        return this.http.get(environment.hostUrl+'/todos?userId=1');
    }

    AddTodo(todo: Todo) : Observable<any> {
        return this.http.post(environment.hostUrl+'/todos',todo);
    }
}