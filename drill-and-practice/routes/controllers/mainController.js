import { sql } from '../../database/database.js';

const showMain = async ({ render }) => {
  
  let topicsNum = 0;
  let questionsNum = 0;
  let answersNum = 0;
  try {
    topicsNum = (await sql`select count(id) from topics`)[0].count;
  } catch (err) {
    console.log(err);
  }
  try {
    questionsNum = (await sql`select count(id) from questions`)[0].count;
  } catch (err) {
    console.log(err);
  }
  try {
    answersNum = (await sql`select count(id) from question_answers`)[0].count;
  } catch (err) {
    console.log(err);
  }
  render("main.eta", { topicsNum, questionsNum, answersNum });
};

export { showMain };
