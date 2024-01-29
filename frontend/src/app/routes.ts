import { provideRouter, withDebugTracing } from "@angular/router";

import { routes } from "./app.routes";


export const appConfig = {
    providers: [provideRouter(routes, withDebugTracing())]
}