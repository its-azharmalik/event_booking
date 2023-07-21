const { default: mongoose } = require('mongoose');
const e = require('../config/errorList');

const eventSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
