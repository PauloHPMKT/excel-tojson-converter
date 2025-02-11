import { Request, Response } from "express";

export const expressAdapter = (controller: any) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      file: req.file,
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
