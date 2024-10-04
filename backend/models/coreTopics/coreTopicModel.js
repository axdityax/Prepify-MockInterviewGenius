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

const CoreTopicModel = mongoose.models.CoreTopic || mongoose.model("CoreTopic", topicSchema);
export default CoreTopicModel;
