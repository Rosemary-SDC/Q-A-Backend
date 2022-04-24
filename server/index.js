import Express from 'express';
import morgan from 'morgan';
import session from './db/index.js';

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded());
import router from './routes.js';
const port = 3000;

app.use('/', router);

// app.use('/', (req, res) => {
//   let questions = [];
//   session
//     .run('match (q:Question) return q limit 10;')
//     .then(({records}) => {
//       records.forEach(record => {
//         questions.push(record._fields[0].properties)
//       })
//     })
//     .then(() => res.send(questions))
//     .catch((err) => console.log('CATCH occurred'))
// });


app.listen(port, () => {
  console.log(`Server running listening on port ${port}`);
});