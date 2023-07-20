import { Router } from "../deps.js";

import * as mainController from "./controllers/mainController.js";
import * as userController from "./controllers/userController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js";

import * as questionAPI from "./apis/questionAPI.js";

const router = new Router();

// @method GET
// @access public
// @description index page
router.get("/", mainController.showMain);

// @method GET
// @access private
// @description get all topics
router.get("/topics", topicController.topics);

// @method POST
// @access private
// @description add topic
router.post("/topics", topicController.add);

// @method POST
// @access private
// @description delete topic
router.post("/topics/:id/delete", topicController.del);

// @method GET
// @access private
// @description get questions about the specific topic
router.get("/topics/:id", questionController.questions);

// @method POST
// @access private
// @description add a question
router.post("/topics/:id/questions", questionController.add);

// @method POST
// @access private
// @description delete the specific question
router.post("/topics/:id/questions/:qId/delete", questionController.del);

// @method GET
// @access private
// @description get all answer options about the specific question
router.get("/topics/:id/questions/:qId", optionController.options);

// @method POST
// @access private
// @description add answer option
router.post("/topics/:id/questions/:qId/options", optionController.add);

// @method POST
// @access private
// @description delete the specific answer option
router.post("/topics/:tId/questions/:qId/options/:oId/delete", optionController.del);

// @method GET
// @access private
// @description get all topics
router.get("/quiz", topicController.topics);

// @method GET
// @access private
// @description get questions about the specific topic
router.get("/quiz/:id", questionController.questions);

// @method GET
// @access private
// @description get all answer options about the specific question
router.get("/quiz/:id/questions/:qId", optionController.options);

// @method POST
// @access private
// @description choose the specific answer option
router.post("/quiz/:tId/questions/:qId/options/:oId", optionController.answers);

// @method GET
// @access private
// @description choosed the correct answer option
router.get("/quiz/:tId/questions/:qId/correct", optionController.correct);

// @method GET
// @access private
// @description choosed the incorrect answer option
router.get("/quiz/:tId/questions/:qId/incorrect", optionController.incorrect);

// @method GET
// @access public
// @description user login
router.get("/auth/login", userController.login);

// @method POST
// @access public
// @description user login
router.post("/auth/login", userController.login);

// @method GET
// @access public
// @description user register
router.get("/auth/register", userController.register);

// @method POST
// @access public
// @description user register
router.post("/auth/register", userController.register);

// @method GET
// @access public
// @description get random question and its answer options
router.get("/api/questions/random", questionAPI.random);

// @method POST
// @access public
// @description 
router.post("/api/questions/answer", questionAPI.answer);

router.get("/logout", (context) => {
    context.state.session.deleteSession();
    context.response.redirect('/');
});

export { router };
