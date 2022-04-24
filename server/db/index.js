// const neo4j = require('neo4j-driver');
import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  'neo4j://localhost:7687',
  neo4j.auth.basic('neo4j','NFJkp6u6mVDPUfsQ')
);

const session = driver.session({
  database: 'questionsandanswers'
});

export default session;

