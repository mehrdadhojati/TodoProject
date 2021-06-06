import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { EditTodoComponent } from './components/todos/edit-todo/edit-todo.component';
import { DeleteTodoComponent } from './components/todos/delete-todo/delete-todo.component';
import { AppConfig } from './services/app-initializer/app.initializer.service';
import { AuthInterceptor } from './services/interceptors/auth.interceptor.service';
import { HeaderComponent } from './components/header/header.component';



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
    HeaderComponent,
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
    },
    ...environment.providers,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
