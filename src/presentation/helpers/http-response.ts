import { HttpResponse } from "../types/http";

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new Error('Server error'),
});
