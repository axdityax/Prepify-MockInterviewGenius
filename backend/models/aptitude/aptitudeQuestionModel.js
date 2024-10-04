import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
	topic: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "AptitudeTopic", // Reference the correct model name
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

// Ensure the model name is correct
const AptitudeQuestionModel =
	mongoose.models.AptitudeQuestion || mongoose.model("AptitudeQuestion", questionSchema);

export default AptitudeQuestionModel;
