import driver from '../db/index.js';
export default {
  fetch: (productId, count, offset) => {
    const session = driver.session({
      database: 'questionsandanswers',
    });
    let questions = [];
    return session
      .readTransaction((txc) => {
        const result =
          txc.run(`MATCH (p:Product{id: ${productId}})-[:HAS_QUESTION]->(q:Question) OPTIONAL MATCH (q)-[:HAS_ANSWER]->(a:Answer) OPTIONAL MATCH (a)-[:HAS_PHOTO]->(ap: AnswerPhotos)
      with q ,collect(a{.*,photos: ap{id:ap.id, url:ap.url}}) as foundAnswers
      RETURN q{.*, answers:foundAnswers} SKIP ${offset} LIMIT ${count}`);
        return result;
      })
      .then(({ records }) => {
        records.forEach((record) => {
          const data = record._fields[0];
          let question = {
            question_id: data.id || data['<id>'],
            question_body: data.body,
            question_date: new Date(data.date_written).toString(),
            asker_name: data.asker_name,
            question_helpfulness: data.helpful,
            reported: !!data.reported,
            answers: [],
          };
          data.answers.forEach((answer) => {
            question.answers.push({
              [answer.id]: {
                id: answer.id,
                body: answer.body,
                date: new Date(answer.date_written).toString(),
                answerer_name: answer.answerer_name,
                helpfulness: answer.helpful,
                photos: answer.photos || [],
              },
            });
          });
          questions.push(question);
        });
        return {
          product_id: productId,
          results: questions,
        };
      })
      .catch((err) => {throw err});
  },

  add: async (question) => {
    const session = driver.session({
      database: 'questionsandanswers',
    });
    return session
      .writeTransaction((txc) => {
        const result = txc.run(`
        MATCH  (p: Product {id: ${
          question.product_id
        }}) create (p)-[:HAS_QUESTION]->(q:Question {
          asker_email: ${JSON.stringify(question.email)},
          asker_name: ${JSON.stringify(question.name)},
          body: ${JSON.stringify(question.body)},
          date_written: ${Number(new Date()).toString()},
          helpful: ${0},
          product_id: ${question.product_id},
          reported: ${0}
        })`);
        return result;
      })
      .then((result) => result)
      .catch((err) => {throw err});
  },

  helpful: async (questionId) => {
    const session = driver.session({
      database: 'questionsandanswers',
    });
    return session
      .writeTransaction(async (txc) => {
        const result = await txc.run(`
        MATCH (q:Question {id: ${questionId}}) SET q.helpful = q.helpful + 1
        `);
        return result;
      })
      .then((result) => result)
      .catch((err) => {throw err});
  },

  report: async (questionId) => {
    const session = driver.session({
      database: 'questionsandanswers',
    });
    return session
      .writeTransaction(async (txc) => {
        const result = await txc.run(`
        MATCH (q:Question {id: ${questionId}}) SET q.reported = q.reported + 1
        `);
        return result;
      })
      .then((result) => result)
      .catch((err) => {throw err});
  },
};
