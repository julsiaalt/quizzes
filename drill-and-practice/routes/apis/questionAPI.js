    import { sql } from "../../database/database.js";

    const random = async ({ response }) => {

        const question_ids = (await sql`select id from questions`);
        console.log(question_ids);
        if (question_ids.length) {
            const rand = Math.floor(1 + Math.random() * (question_ids.length - 1));
            console.log(rand);
            const question = (await sql`select * from questions where id=${question_ids[rand].id}`)[0];
            const options = (await sql`select * from question_answer_options where question_id=${question.id} order by id asc`);
            let answerOptions = [];
            options.forEach(option => {
                answerOptions.push({
                    "optionId": option.id,
                    "optionText": option.option_text,
                })
            });
            response.body = {
                "questionID": question.id,
                "questionText": question.question_text,
                "answerOptions": answerOptions,
            };
        } else {
            response.body = {};
        }
    };

    const answer = async ({ request, response }) => {
        
        const { questionId, optionId } = await request.body().value;

        const option = (await sql`select * from question_answer_options where id=${optionId} and question_id=${questionId}`)[0] || null;
        if (option) {
            response.body = {
                correct: option.is_correct
            }
        } else {
            response.body = {}
        }
    };

    export { random, answer }