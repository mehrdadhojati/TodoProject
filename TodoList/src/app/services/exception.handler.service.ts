import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class ExceptionHandlerService {

    Log(error:any) {
        console.log(error);
    }
}