const { Event, User } = require('../../models');

module.exports = {
	events: async () => {
		try {
			const events = await Event.find()
				// replace populate with user and event fetching functions
				.populate('creator');

			return events.map((event) => {
				return {
					...event._doc,
					date: new Date(event._doc.date).toISOString(),
				};
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	createEvent: async (args) => {
		const event = new Event({
			title: args.eventInput.title,
			description: args.eventInput.description,
			price: +args.eventInput.price,
			date: new Date(args.eventInput.date),
			creator: '64bac46f289cb6ea069bed6e',
		});
		let createdEvent;
		const result = await event.save();

		try {
			createdEvent = {
				...result._doc,
				date: new Date(event._doc.date).toISOString(),
			};
			const user = await User.findById('64bac46f289cb6ea069bed6e');

			if (!user) throw new Error('User Not Found');
			user.createdEvents.push(event);
			await user.save();

			return createdEvent;
		} catch (error) {
			console.log(err);
			throw err;
		}
	},
	createUser: async (args) => {
		const user = await signup(args);
		return user;
	},
};
