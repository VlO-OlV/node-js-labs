import { Router } from "express";

export const router: Router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

// router.get('/menu', );