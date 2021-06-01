import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ITodo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { DataTableDataSource } from './data-table-datasource';
import {MatDialog} from '@angular/material/dialog'
import { EditTodoComponent } from '../todos/edit-todo/edit-todo.component';
import { DeleteTodoComponent } from '../todos/delete-todo/delete-todo.component';
import { AppConfig } from 'src/app/services/app-initializer/app.initializer.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ITodo>;
  dataSource: DataTableDataSource;
  dataItems: ITodo[] = [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'Status', 'Edit', 'Delete'];

  constructor(private todoService: TodoService,
              private matDialog: MatDialog,
              private appConfig: AppConfig) {
    this.dataSource = new DataTableDataSource();
    
  }

  ngOnInit() {
    this.dataSource.data = this.todoService.todos;
    
    // to get changes in todos
    this.todoService.todoItems.subscribe((items: ITodo[]) => {
      this.dataSource.data = items;
      this.paginator._changePageSize(this.paginator.pageSize);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openEditDialog(id: number) {
    let todo: ITodo = this.todoService.GetTodoById(id);
    this.matDialog.open(EditTodoComponent, {data: todo});
  }

  onChangeStatus(id: number) {
    this.todoService.ChangeTodoStatus(id);
  }

  onDeleteTodo(id: number) {
    this.todoService.DeleteTodo(id);
  }
  onDeleteDialog(id: number) {
    let todo: ITodo = this.todoService.GetTodoById(id);
    let dialogRes = this.matDialog.open(DeleteTodoComponent, {data: todo});

    dialogRes.afterClosed().subscribe(result => {
      if(result == 'true') {
        this.todoService.DeleteTodo(id);
      }
    });
  }
}
