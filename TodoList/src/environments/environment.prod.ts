import { TodoApiHelperService as MockTodoApiHelperService } from "src/app/services/todo.apihelper.mock.service";
import { TodoApiHelperService } from "src/app/services/todo.apihelper.service";


export const environment = {
  production: true,
  hostUrl: 'https://jsonplaceholder.typicode.com',
  token: 'abcToken@developer',
  appMode: "API Mode",
  providers: [
    {provide: MockTodoApiHelperService , useClass: TodoApiHelperService}
  ]
};
