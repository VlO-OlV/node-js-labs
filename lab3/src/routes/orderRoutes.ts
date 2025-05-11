import { Router } from "express";
import path from "path";
export const router: Router = Router();

const createPath = (page: string) => path.join(__dirname, '/../views', `${page}.ejs`);

router.get('/', (req, res) => {});
router.get('/:id', (req, res) => {});
router.post('/', (req, res) => {});
router.post('/:id/items', (req, res) => {});
router.post('/:id/status', (req, res) => {});
