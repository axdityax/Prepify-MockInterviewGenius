import AptitudeQuestionModel from "../models/aptitude/AptitudeQuestionModel.js";
import AptitudeTopicModel from "../models/aptitude/AptitudeTopicModel.js";

// Add many questions to a topic
export const addManyQuestions = async (req, res) => {
	try {
		const { questions } = req.body;

		const processedQuestions = await Promise.all(
			questions.map(async (question) => {
				const topic = await AptitudeTopicModel.findOne({ name: question.topic });
				if (!topic) {
					throw new Error(`Topic '${question.topic}' not found`);
				}

				return {
					...question,
					topic: topic._id,
				};
			})
		);

		const insertedQuestions = await AptitudeQuestionModel.insertMany(processedQuestions);
		res.status(201).json({ success: true, data: insertedQuestions });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Add a single question
export const addSingleQuestion = async (req, res) => {
	try {
		const { topic: topicName, question, options, answer, explanation } = req.body;

		const topic = await AptitudeTopicModel.findOne({ name: topicName });
		if (!topic) {
			return res.status(404).json({ success: false, message: "Topic not found" });
		}

		const newQuestion = new AptitudeQuestionModel({
			topic: topic._id,
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
		const question = await AptitudeQuestionModel.findById(req.params.id).populate("topic");
		if (!question) {
			return res.status(404).json({ success: false, message: "Question not found" });
		}
		res.status(200).json({ success: true, data: question });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get all questions by topic ID
export const getAllQuestionsByTopicId = async (req, res) => {
	try {
		const questions = await AptitudeQuestionModel.find({ topic: req.params.topicId });
		res.status(200).json({ success: true, data: questions });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get all topics
export const getAllTopics = async (req, res) => {
	try {
		const topics = await AptitudeTopicModel.find();
		res.status(200).json({ success: true, data: topics });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get single topic by ID
export const getTopicById = async (req, res) => {
	try {
		const topic = await AptitudeTopicModel.findById(req.params.id);
		if (!topic) {
			return res.status(404).json({ success: false, message: "Topic not found" });
		}
		res.status(200).json({ success: true, data: topic });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get a topic by name (or other specific attribute)
export const getTopicByName = async (req, res) => {
	try {
		const topic = await AptitudeTopicModel.findOne({ name: req.params.name });
		if (!topic) {
			return res.status(404).json({ success: false, message: "Topic not found" });
		}
		res.status(200).json({ success: true, data: topic });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Add topic by name (or other specific attribute)
export const addTopic = async (req, res) => {
	try {
		const { name, description } = req.body;
		const topic = new AptitudeTopicModel({ name, description });
		await topic.save();
		res.status(201).json({ success: true, data: topic });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
