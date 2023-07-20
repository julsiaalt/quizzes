import { sql } from "../../database/database.js";

const add = async ({ params, state, request, response }) => {
  let user = (await state.session.get("userInfo")) || null;
  let tid = params.id;
  let qId = params.qId;
  if (user) {
    let params = {};
    const data = await request.body().value;
    for (const [key, valor] of data) {
      params[key] = valor;
    }
    let is_correct = false;
    if (params.is_correct)
      is_correct = true;
    try {
      let option = (await sql`insert into question_answer_options (question_id, option_text, is_correct) values (${qId}, ${params.option_text}, ${is_correct})`);
      console.log(option.id);
      return response.redirect("/topics/" + tid + "/questions/" + qId);
    } catch (err) {
      return response.redirect("/topics/" + tid + "/questions/" + qId, {
        option: "Failed!",
      });
    }
  } else {
    return response.redirect("/auth/login");
  }
};

const del = async ({ params, state, response }) => {
  let user = (await state.session.get("userInfo")) || null;
  const tId = params.tId;
  const qId = params.qId;
  const oId = params.oId;
  if (user) {
    try {
      await sql`DELETE FROM question_answer_options 
                      WHERE id=${oId}`;
      return response.redirect("/topics/"+ tId +"/questions/"+qId);
    } catch (err) {
      return response.redirect("/topics/" + tId + "/questions/" + qId, {msg: "Failed!"});
    }
  } else {
    return response.redirect("/auth/login");
  }
};

const answers = async ({ params, render, state, response }) => {
  let user = (await state.session.get("userInfo")) || null;
  let tId = params.tId;
  let qId = params.qId;
  let oId = params.oId;
  if (user) {
    (await sql`insert into question_answers (user_id, question_id, question_answer_option_id) values (${user.id}, ${qId}, ${oId})`); 
    const option = (await sql`select * from question_answer_options where id=${oId}`)[0] || null;
    if (option) {
      if (option.is_correct) {
        return response.redirect(`/quiz/${tId}/questions/${qId}/correct`);
      } else {
        return response.redirect(`/quiz/${tId}/questions/${qId}/incorrect`);
      }
    } else {
      return response.redirect("/quiz/"+ tId +"/questions/"+qId);
    }
  } else {
    return response.redirect("/auth/login");
  }
};

const correct = async ({ params, render, state, response }) => {
  let user = (await state.session.get("userInfo")) || null;
  let tId = params.tId;
  let qId = params.qId;
  if (user) {

    render("correct.eta", {tId}); 

    (await sql`insert into question_answers (user_id, question_id, question_answer_option_id) values (${user.id}, ${qId}, ${oId})`); 
    const option = (await sql`select * from question_answer_options where id=${oId}`)[0] || null;
    if (option) {
      if (option.is_correct) {
        return response.redirect(`/quiz/${tId}/questions/${qId}/correct`);
      } else {
        return response.redirect(`/quiz/${tId}/questions/${qId}/incorrect`);
      }
    } else {
      return response.redirect("/quiz/"+ tId +"/questions/"+qId);
    }
  } else {
    return response.redirect("/auth/login");
  }
};

const incorrect = async ({ params, render, state, response }) => {
  let user = (await state.session.get("userInfo")) || null;
  let tId = params.tId;
  let qId = params.qId;
  if (user) {

    const option = (await sql`select * from question_answer_options where question_id=${qId} and is_correct=true`)[0] || null;

    render("incorrect.eta", {tId, option}); 

    (await sql`insert into question_answers (user_id, question_id, question_answer_option_id) values (${user.id}, ${qId}, ${oId})`); 
    
    if (option) {
      if (option.is_correct) {
        return response.redirect(`/quiz/${tId}/questions/${qId}/correct`);
      } else {
        return response.redirect(`/quiz/${tId}/questions/${qId}/incorrect`);
      }
    } else {
      return response.redirect("/quiz/"+ tId +"/questions/"+qId);
    }
  } else {
    return response.redirect("/auth/login");
  }
};

const options = async ({ request, params, render, state, response }) => {
  let user = (await state.session.get("userInfo")) || null;
  let tId = params.id;
  let qId = params.qId;
  if (user) {
    const topic = (await sql`select * from topics where id=${tId}`)[0] || null;
    const question = (await sql`select * from questions where id=${qId}`)[0] || null;
    const options =
      (await sql`select * from question_answer_options where question_id=${qId} order by id asc`);
    if (topic && question) {
      if (request.url.href.indexOf('quiz') >= 0) {
        render("options.eta", { topic, question, options, is_quiz: true });
      } else {
        render("options.eta", { topic, question, options}); 
      }
    } else {
      return response.redirect("/topics/" + tId);
    }
  } else {
    return response.redirect("/auth/login");
  }
};

export { add, del, options, answers, correct, incorrect };
