import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { TodosComponent } from './components/todos/todos.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { EditTodoComponent } from './components/todos/edit-todo/edit-todo.component';
import { DeleteTodoComponent } from './components/todos/delete-todo/delete-todo.component';
import { AppConfig } from './services/app-initializer/app.initializer.service';

const appConfig = (config: AppConfig) => {
  return () => {
    return config.initialize();
  }
}


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    DataTableComponent,
    EditTodoComponent,
    DeleteTodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    })
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: appConfig,
      multi: true,
      deps: [AppConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
