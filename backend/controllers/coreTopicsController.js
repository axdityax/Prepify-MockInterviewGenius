import CoreQuestionModel from "../models/coreTopics/coreQuestionModel.js";
import CoreSubtopicModel from "../models/coreTopics/coreSubTopicModel.js";
import CoreTopicModel from "../models/coreTopics/coreTopicModel.js";

// Add many questions to a subtopic
export const addManyQuestions = async (req, res) => {
	try {
		const { questions } = req.body;

		if (!Array.isArray(questions) || questions.length === 0) {
			return res.status(400).json({
				success: false,
				message: "Questions should be an array and cannot be empty.",
			});
		}

		const processedQuestions = [];

		for (const question of questions) {
			const { topicName, subtopicName, questionText, options, answer, explanation } =
				question;

			const topic = await CoreTopicModel.findOne({ name: topicName });
			if (!topic) {
				return res.status(404).json({
					success: false,
					message: `Topic "${topicName}" not found.`,
				});
			}

			const subtopic = await CoreSubtopicModel.findOne({ name: subtopicName });
			if (!subtopic) {
				return res.status(404).json({
					success: false,
					message: `Subtopic "${subtopicName}" not found.`,
				});
			}

			const newQuestion = new CoreQuestionModel({
				topic: topic._id,
				subtopic: subtopic._id,
				question: questionText,
				options: options,
				answer: answer,
				explanation: explanation,
			});

			const savedQuestion = await newQuestion.save();
			processedQuestions.push(savedQuestion);
		}

		res.status(201).json({ success: true, data: processedQuestions });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Add a single question
export const addSingleQuestion = async (req, res) => {
	try {
		const { subtopic, question, options, answer, explanation } = req.body;
		const newQuestion = new CoreQuestionModel({
			subtopic,
			question,
			options,
			answer,
			explanation,
		});
		await newQuestion.save();
		res.status(201).json({ success: true, data: newQuestion });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get question by ID
export const getQuestionById = async (req, res) => {
	try {
		const question = await CoreQuestionModel.findById(req.params.id).populate("subtopic");
		if (!question) {
			return res.status(404).json({ success: false, message: "Question not found" });
		}
		res.status(200).json({ success: true, data: question });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get all questions by subtopic ID
export const getAllQuestionsBySubtopicId = async (req, res) => {
	try {
		const questions = await CoreQuestionModel.find({ subtopic: req.params.subtopicId });
		res.status(200).json({ success: true, data: questions });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get all topics
export const getAllTopics = async (req, res) => {
	try {
		const topics = await CoreTopicModel.find();
		res.status(200).json({ success: true, data: topics });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get all subtopics
export const getAllSubtopics = async (req, res) => {
	try {
		const subtopics = await CoreSubtopicModel.find();
		res.status(200).json({ success: true, data: subtopics });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get single topic by ID
export const getTopicById = async (req, res) => {
	try {
		const topic = await CoreTopicModel.findById(req.params.id);
		if (!topic) {
			return res.status(404).json({ success: false, message: "Topic not found" });
		}
		res.status(200).json({ success: true, data: topic });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get a topic by name
export const getTopicByName = async (req, res) => {
	try {
		const topic = await CoreTopicModel.findOne({ name: req.params.name });
		if (!topic) {
			return res.status(404).json({ success: false, message: "Topic not found" });
		}
		res.status(200).json({ success: true, data: topic });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get a subtopic by name
export const getSubtopicByName = async (req, res) => {
	try {
		const subtopic = await CoreSubtopicModel.findOne({ name: req.params.name });
		if (!subtopic) {
			return res.status(404).json({ success: false, message: "Subtopic not found" });
		}
		res.status(200).json({ success: true, data: subtopic });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Add a topic
export const addTopic = async (req, res) => {
	try {
		const { name, description } = req.body;
		const newTopic = new CoreTopicModel({ name, description });
		await newTopic.save();
		res.status(201).json({ success: true, data: newTopic });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Add a subtopic
export const addSubtopic = async (req, res) => {
	try {
		const { name, theory, topic } = req.body;
		const newSubtopic = new CoreSubtopicModel({ name, theory, topic });
		await newSubtopic.save();
		res.status(201).json({ success: true, data: newSubtopic });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Add many subtopics
export const addManySubtopics = async (req, res) => {
	try {
		const subtopics = req.body.subtopics;

		if (!Array.isArray(subtopics) || subtopics.length === 0) {
			return res.status(400).json({
				success: false,
				message: "Subtopics should be an array and cannot be empty.",
			});
		}

		const newSubtopics = [];

		for (const subtopic of subtopics) {
			const { name, theory, topicName } = subtopic;

			const topic = await CoreTopicModel.findOne({ name: topicName });

			if (!topic) {
				return res.status(404).json({
					success: false,
					message: `Topic "${topicName}" not found.`,
				});
			}

			const newSubtopic = new CoreSubtopicModel({ name, theory, topic: topic._id });
			await newSubtopic.save();
			newSubtopics.push(newSubtopic);
		}

		res.status(201).json({ success: true, data: newSubtopics });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get all questions by topic ID
export const getAllQuestionsByTopicId = async (req, res) => {
	const { topicId } = req.params;

	try {
		const questions = await CoreQuestionModel.find({ topic: topicId });

		if (questions.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "No questions found for this topic." });
		}

		res.status(200).json({ success: true, data: questions });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
