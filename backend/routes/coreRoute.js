import express from "express";
import {
	addSingleQuestion,
	getQuestionById,
	getAllQuestionsByTopicId,
	getAllQuestionsBySubtopicId,
	getAllTopics,
	getAllSubtopics,
	getTopicById,
	getTopicByName,
	getSubtopicByName,
	addTopic,
	addSubtopic,
	addManyQuestions,
	addManySubtopics,
} from "../controllers/coreTopicsController.js";

const coreRouter = express.Router();

// Question routes
coreRouter.post("/questions/add/many", addManyQuestions); // Add many questions
coreRouter.post("/questions/single", addSingleQuestion); // Add a single question
coreRouter.get("/questions/:id", getQuestionById); // Get question by ID
coreRouter.get("/topics/:topicId/questions", getAllQuestionsByTopicId); // Get all questions by topic ID
coreRouter.get("/subtopics/:subtopicId/questions", getAllQuestionsBySubtopicId); // Get all questions by Subtopic ID

// Topic routes
coreRouter.get("/topics/all", getAllTopics); // Get all topics
coreRouter.get("/topics/:id", getTopicById); // Get single topic by ID
coreRouter.get("/topics/name/:name", getTopicByName); // Get topic by name
coreRouter.post("/topics/add", addTopic); // Add a new topic

// Subtopic routes
coreRouter.get("/subtopics/all", getAllSubtopics); // Get all subtopics
coreRouter.get("/subtopics/name/:name", getSubtopicByName); // Get a subtopic by name
coreRouter.post("/subtopics/add", addSubtopic); // Add a new subtopic
coreRouter.post("/subtopics/add/many", addManySubtopics); // Add a new subtopic

export default coreRouter;
