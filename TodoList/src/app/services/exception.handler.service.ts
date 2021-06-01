import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({providedIn:'root'})
export class ExceptionHandlerService {

    constructor(private toastr: ToastrService) {}
    Log(error:any) {
        console.log(error);
        //this.toastr.error(error)
    }
}