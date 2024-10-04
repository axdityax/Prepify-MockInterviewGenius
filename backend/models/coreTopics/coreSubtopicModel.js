import mongoose from "mongoose";

const subtopicSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	theory: {
		type: String,
		required: true,
	},
	topic: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CoreTopic", // Reference to the Topic model
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Ensure the model name is unique
const CoreSubtopicModel =
	mongoose.models.CoreSubtopic || mongoose.model("CoreSubtopic", subtopicSchema);
export default CoreSubtopicModel;
