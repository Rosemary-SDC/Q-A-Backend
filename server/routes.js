import controller from './controllers/index.js';
import {Router} from 'express';

const router = Router();
//Connect controller methods to their corresponding routes
router.get('/qa/questions', controller.questions.get);
router.post('/qa/questions', controller.questions.post);
router.put('/qa/questions/:question_id/helpful', controller.questions.putHelpful);
router.put('/qa/questions/:question_id/report', controller.questions.putReport);
router.get('/qa/questions/:question_id/answers', controller.answers.get);
router.post('/qa/questions/:question_id/answers', controller.answers.post);
router.put('/qa/answers/:question_id/helpful', controller.questions.putHelpful);
router.put('/qa/answers/:question_id/report', controller.questions.putReport);


export default router;
