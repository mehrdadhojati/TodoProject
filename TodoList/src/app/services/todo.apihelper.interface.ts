import { Observable } from "rxjs";
import { ITodo } from "../models/todo.model";

export interface ITodoApiHelperService {
    GetTodos() : Observable<any>,
    AddTodo(todo: ITodo) : Observable<any>,
    EditTodo(todo: ITodo) : Observable<any>,
    ChangeTodoStatus(id: number, status: boolean) : Observable<any>,
    DeleteTodo(id: number) : Observable<any>
}