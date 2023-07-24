  import { sql } from "../../database/database.js";

  const add = async ({ params, state, request, response }) => {
    let user = (await state.session.get("userInfo")) || null;
    let tid = params.id;
    if (user) {
      let params = {};
      const data = await request.body().value;
      for (const [key, valor] of data) {
        params[key] = valor;
      }
      try {
        await sql`insert into questions (user_id, topic_id, question_text) values (${user.id}, ${tid}, ${params.question_text})`;
        return response.redirect("/topics/" + tid);
      } catch (err) {
        return response.redirect("/topics/" + tid, { question: "Failed!" });
      }
    } else {
      return response.redirect("/auth/login");
    }
  };

  const del = async ({ params, state, response }) => {
    let user = (await state.session.get("userInfo")) || null;
    const tId = params.id;
    const qId = params.qId;
    if (user) {
      try {
        await sql`DELETE FROM question_answer_options 
                        WHERE question_id=${qId}`;
        await sql`DELETE FROM question_answers 
                        WHERE question_id=${qId}`;
        await sql`DELETE FROM questions 
                        WHERE id=${qId}`;
        return response.redirect("/topics/"+ tId);
      } catch (err) {
        return response.redirect("/topics/" + tId, {msg: "Failed!"});
      }
    } else {
      return response.redirect("/auth/login");
    }
  };

  const questions = async ({ request, params, render, state, response }) => {
    let user = (await state.session.get("userInfo")) || null;
    let tid = params.id;
    if (user) {
      const topic = (await sql`select * from topics where id=${tid}`)[0] || null;
      const questions =
        await sql`select * from questions where topic_id=${tid} order by question_text asc`;
      if (topic) {
        if (request.url.href.indexOf("quiz") >= 0) {
          render("questions.eta", { topic, questions, is_quiz: true });  
        } else {
          render("questions.eta", { topic, questions});
        }
      } else {
        return response.redirect("/topics");
      }
    } else {
      return response.redirect("/auth/login");
    }
  };

  export { add, questions, del };
