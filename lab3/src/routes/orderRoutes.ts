import { Router, Request, Response } from "express";
import path from "path";

export const router: Router = Router();

const createPath = (page: string) => path.join(__dirname, '/../views', `${page}.ejs`);

router.get('/', (request: Request, response: Response) => { });
router.get('/:id', (request: Request, response: Response) => { });
router.post('/', (request: Request, response: Response) => { });
router.post('/:id/items', (request: Request, response: Response) => { });
router.post('/:id/status', (request: Request, response: Response) => { });
