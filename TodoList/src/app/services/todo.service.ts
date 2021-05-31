import { Injectable, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { exhaustMap, subscribeOn } from "rxjs/operators";
import { Todo } from "../models/todo.model";
import { ExceptionHandlerService } from "./exception.handler.service";
import { TodoApiHelperService } from "./todo.apihelper.service";

@Injectable({providedIn:'root'})
export class TodoService implements OnInit {
    todoItems: Subject<Todo[]> = new Subject<Todo[]>();
    todos: Todo[] = [];

    /** to add item using exhaustMap */
    private addClicked: Subject<Todo> = new Subject<Todo>();

    constructor(private todoApiHelper: TodoApiHelperService,
                private ExceptionHandler: ExceptionHandlerService,
                private toastr: ToastrService) {

        this.AddItemExhausted();
    }
    ngOnInit() {
        
    }

    /** Get Max id number in Todo Array */
    GetMaxId(): number {
        return Math.max.apply(Math, this.todos.map(function(o) { return o.id; }))
    }

    /** Get All Todo Items from API */
    GetTodos() {
        this.todoApiHelper.GetTodos().subscribe((items:Todo[])=> {
            this.todoItems.next(items);
            this.todos = items;
          }, (error:any) => {
            this.ExceptionHandler.Log(error);
          });
    }

    /** Add New Todo Item */
    AddTodo(todoTitle: string) {
        //create new todo item (use object as interface)
        let todo = {
            id:this.GetMaxId()+1,
            title: todoTitle,
            userId:1,
            completed:false} as Todo;
        //call exhaustMap to add Item
        this.addClicked.next(todo);
        this.toastr.info("Please Wait...");
    }

    /** Add Todo Item To List and Call Api with ExhaustMap */
    private AddItemExhausted() {
        this.addClicked.pipe(exhaustMap((todo: Todo)=> this.todoApiHelper.AddTodo(todo)))
        .subscribe((todo:Todo)=> {
            this.todos.push(todo);
            this.todoItems.next(this.todos);
            this.toastr.success("Your Todo Added Successfully");
        }, (error: any)=> {
            this.ExceptionHandler.Log(error);
        });
    }
}