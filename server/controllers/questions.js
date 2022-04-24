import models from '../models/index.js';
export default {
  get: (req, res) => {
    const productId = req.query.product_id;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    //console.log( productId, page, count);
    models.questions.fetch(productId, page, count)
    .then((data) => res.send(data))
    .catch((err) => console.log('controller catch'));
  }
}