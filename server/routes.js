import controller from './controllers/index.js';
import {Router} from 'express';

const router = Router();
//Connect controller methods to their corresponding routes
router.get('/qa/questions', controller.questions.get);

// router.post('/qa/questions', controller.questions.post);

// router.get('/qa/answers', controller.answers.get);

// router.post('/qa/answers', controller.answers.post);


export default router;
