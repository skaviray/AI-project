import type { Request, Response } from "express"

export const info = (req: Request, res: Response) => {
    res.send({
        message: 'This is a simple backend developed in node',
        version: '1.0',
    });
}