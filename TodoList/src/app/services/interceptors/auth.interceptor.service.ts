import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { environment } from "src/environments/environment";


export class AuthInterceptor implements HttpInterceptor {
    intercept(req:HttpRequest<any>, next: HttpHandler) {
        const manipulatedRequest = req.clone({headers: req.headers.append('Authorization',
                                                                    'Bearer '+environment.token)})
        return next.handle(manipulatedRequest);
    }
}