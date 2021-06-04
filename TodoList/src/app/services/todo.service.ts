import { Injectable, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { forkJoin, merge, of, Subject } from "rxjs";
import { exhaustMap, map, mergeMap, subscribeOn, tap } from "rxjs/operators";
import { ITodo } from "../models/todo.model";
import { AppConfig } from "./app-initializer/app.initializer.service";
import { ExceptionHandlerService } from "./exception.handler.service";
import { TodoApiHelperService } from "./todo.apihelper.mock.service";

@Injectable({providedIn:'root'})
export class TodoService {
    todoItems: Subject<ITodo[]> = new Subject<ITodo[]>();
    todos: ITodo[] = [];

    /** to add item using exhaustMap */
    private addClicked: Subject<ITodo> = new Subject<ITodo>();
    /** to Edit item using exhaustMap */
    private editClicked: Subject<ITodo> = new Subject<ITodo>();
    /** to Change Todo Status using exhaustMap */
    private StatusClicked: Subject<number> = new Subject<number>();
    /** to Delete Todo using exhaustMap */
    private DeleteClicked: Subject<number> = new Subject<number>();

    constructor(private todoApiHelper: TodoApiHelperService,
                private ExceptionHandler: ExceptionHandlerService,
                private toastr: ToastrService,
                private appConfig: AppConfig) {

        this.AddItemExhausted();
        this.EditItemExhausted();
        this.ChangeStatusExhausted();
        this.DeleteExhausted();

        this.appConfig.todoItems.subscribe((todos: ITodo[]) => {
            this.todoItems.next(todos);
            this.todos = [...todos];
         });
    }
    
    
    /** Get Max id number in Todo Array */
    GetMaxId(): number {
        return Math.max.apply(Math, this.todos.map(function(o) { return o.id; }))
    }

    /** Get All Todo Items from API */
    GetTodos() {
        this.todoApiHelper.GetTodos().subscribe((items:ITodo[])=> {
            this.todoItems.next(items);
            this.todos = items;
          }, (error:any) => {
            this.ExceptionHandler.Log(error);
          });
    }

    GetTodoById(id: number): ITodo {
        let todo = this.todos.filter((item) => {
            return item.id == id
        });
        return todo[0];
    }

    /** Add New Todo Item */
    AddTodo(todoTitle: string) {
        //create new todo item (use object as interface)
        let todo = {
            id:this.GetMaxId()+1,
            title: todoTitle,
            userId:1,
            completed:false} as ITodo;
        //call exhaustMap to add Item
        this.addClicked.next(todo);
        this.toastr.info("Please Wait...");
    }

    /** Add Todo Item To List and Call Api with ExhaustMap */
    private AddItemExhausted() {
        this.addClicked.pipe(exhaustMap((todo: ITodo)=> this.todoApiHelper.AddTodo(todo)))
        .subscribe((todo:ITodo)=> {
            this.todos.push(todo);
            this.todoItems.next(this.todos);
            this.toastr.success("Your Todo Added Successfully");
        }, (error: any)=> {
            this.ExceptionHandler.Log(error);
        });
    }

    /** Edit Todo Item from API */
    EditTodo(todo: ITodo) {
        this.editClicked.next(todo);
        this.toastr.info("Please Wait...");
    }

    /** Edit Todo Item To List and Call Api with ExhaustMap */
    private EditItemExhausted() {
        this.editClicked.pipe(exhaustMap((todo: ITodo)=> this.todoApiHelper.EditTodo(todo)))
        .subscribe((todo:ITodo)=> {
            let item = this.GetTodoById(todo.id);
            item.title = todo.title;
            this.toastr.success("Your Todo Edited Successfully");
        }, (error: any)=> {
            this.ExceptionHandler.Log(error);
        });
    }

    ChangeTodoStatus(id: number) {
        this.StatusClicked.next(id);
        this.toastr.info("Please Wait...");
    }

     /** Change Todo Status from Api with ExhaustMap */
     private ChangeStatusExhausted() {
        this.StatusClicked.pipe(exhaustMap((id: number)=> 
            this.todoApiHelper.ChangeTodoStatus(id, !this.GetTodoById(id).completed)))
        .subscribe((todo: ITodo)=> {
            let item = this.GetTodoById(todo.id);
            item.completed = !item.completed;
            this.toastr.success("Todo Status Changed Successfully");
        }, (error: any)=> {
            this.ExceptionHandler.Log(error);
        });
    }

    /** Delete a Todo from API */
    DeleteTodo(id: number) {
        this.DeleteClicked.next(id);
        this.toastr.info("Please Wait...");
    }

    /** Delete Todo from Api with ExhaustMap */
    private DeleteExhausted() {
        this.DeleteClicked.pipe(
            exhaustMap((id:number) => {
                return forkJoin([of(id),  this.todoApiHelper.DeleteTodo(id)]).pipe(
                    map((result) => {
                        return {
                            id: result[0],
                            del: result[1]
                        }
                    },(error:any)=> {
                        this.ExceptionHandler.Log(error)
                    })
                )
            })
        )
        .subscribe((res)=> {
            let index = this.todos.findIndex(i => i.id == res.id);
            this.todos.splice(index,1);
            this.todoItems.next(this.todos);
            this.toastr.success("Todo Status Changed Successfully");
        }, (error: any)=> {
            this.ExceptionHandler.Log(error);
        });
    }
}