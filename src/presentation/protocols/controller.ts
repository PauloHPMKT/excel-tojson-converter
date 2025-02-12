import { HttpRequest, HttpResponse } from "../types/http";

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
