import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateData = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: "Validation failed",
          details: error.errors,
        });
      }
      res.status(500).json({
        error: "Internal server error in validation",
      });
    }
  };
};
