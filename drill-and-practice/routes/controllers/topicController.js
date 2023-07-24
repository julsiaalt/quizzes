  import { sql } from "../../database/database.js";

  const topics = async ({request, render, state, response }) => {
    let user = (await state.session.get("userInfo")) || null;
    if (user) {
      let topics = null;
      topics = await sql`select * from topics order by name asc`;
      if (request.url.href.indexOf('quiz') >= 0) {
        render("topics.eta", { topics, is_quiz: true });  
      } else {
        render("topics.eta", { topics, admin: user.admin});
      }
    } else {
      return response.redirect("/auth/login");
    }
  };

  const add = async ({ state, request, response }) => {
    let user = (await state.session.get("userInfo")) || null;
    if (user) {
      let params = {};
      const data = await request.body().value;
      for (const [key, valor] of data) {
        params[key] = valor;
      }
      try {
        await sql`insert into topics (user_id, name) values (${user.id}, ${params.name})`;
        return response.redirect("/topics");
      } catch (err) {
        return response.redirect("/topics", { name: "Failed!" });
      }
    } else {
      return response.redirect("/auth/login");
    }
  };

  const del = async ({ params, state, response }) => {
    let user = (await state.session.get("userInfo")) || null;
    let tid = params.id;
    if (user) {
      try {
        await sql`DELETE FROM question_answer_options 
                        USING questions
                        WHERE questions.id=question_answer_options.question_id
                          AND questions.topic_id=${tid}`;
        await sql`DELETE FROM question_answers 
                        USING questions
                        WHERE questions.id=question_answers.question_id
                          AND questions.topic_id=${tid}`;
        await sql`delete from questions where topic_id=${tid}`;
        await sql`delete from topics where id=${tid}`;
        return response.redirect("/topics");
      } catch (err) {
        return response.redirect("/topics");
      }
    } else {
      return response.redirect("/auth/login");
    }
  };

  export { add, del, topics };
