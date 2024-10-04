import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Ensure the model name is correct
const AptitudeTopicModel =
	mongoose.models.AptitudeTopic || mongoose.model("AptitudeTopic", topicSchema);

export default AptitudeTopicModel;
