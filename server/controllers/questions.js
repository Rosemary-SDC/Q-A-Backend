import models from '../models/index.js';
export default {
  get: (req, res) => {
    const productId = req.query.product_id;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const offset = (page -1) * count
    //console.log( productId, page, count);
    models.questions.fetch(productId, count, offset)
    .then((data) => res.send(data))
    .catch((err) => {throw err});
  },
  post: (req, res) => {
    const reqBody = req.body;
    const newQuestion = {
      body: reqBody.body,
      name: reqBody.name,
      email: reqBody.email,
      product_id: reqBody.product_id
    }
    models.questions.add(newQuestion)
    .then(() => res.status(201).send())
    .catch((err) => {throw err});
  },

  putHelpful: (req, res) => {
    const questionId = req.params.question_id;
    models.questions.helpful(questionId)
    .then(() => res.status(204).send())
    .catch((err) => {throw err})
  },

  putReport: (req, res) => {
    const questionId = req.params.question_id;
    models.questions.report(questionId)
    .then(() => res.status(204).send())
    .catch((err) => {throw err})
  }
}