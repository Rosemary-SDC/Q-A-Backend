import models from '../models/index.js';
export default {
  get: (req, res) => {
    const questionId = req.params.question_id;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const offset = (page - 1) * count;
    //console.log( productId, page, count);
    models.answers.fetch(questionId, offset, count)
    .then((data) => res.send(data))
    .catch((err) => console.log('controller catch'));
  },

  post: (req, res) => {
    const questionId = req.params.question_id;
    const reqBody = req.body;
    const newAnswer = {
      body: reqBody.body || '',
      name: reqBody.name || '',
      email: reqBody.email || '',
      photos: reqBody.photos || []
    }
    models.answers.add(questionId, newAnswer)
    .then(()=> res.status(201).send())
    .catch((err) => res.send(err));
  },

  putHelpful: (req, res) => {
    const answer = req.params.question_id;
    models.answers.helpful(questionId)
    .then(() => res.status(204).send())
    .catch((err) => res.send(err))
  },

  putReport: (req, res) => {
    const questionId = req.params.question_id;
    models.answers.report(questionId)
    .then(() => res.status(204).send())
    .catch((err) => res.send(err))
  }

}