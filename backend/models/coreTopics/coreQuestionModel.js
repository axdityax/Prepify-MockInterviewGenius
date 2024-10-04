import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
	topic: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CoreTopic", // Reference to the Topic model
		required: true,
	},
	subtopic: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CoreSubtopic", // Reference to the Subtopic model
		required: true,
	},
	question: {
		type: String,
		required: true,
	},
	options: {
		type: [String],
		required: true,
	},
	answer: {
		type: String,
		required: true,
	},
	explanation: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Ensure the model name is unique
const CoreQuestionModel =
	mongoose.models.CoreQuestion || mongoose.model("CoreQuestion", questionSchema);
export default CoreQuestionModel;
