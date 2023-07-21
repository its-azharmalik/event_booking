const { buildSchema } = require('graphql');

module.exports = buildSchema(`

			type Event {
				_id: ID!
				title: String!
				description: String!
				price: Float!
				date: String! 
				creator: User
			}

			type User {
				_id: ID!
				username: String!
				email: String!
				password: String
				avatar: String
				createdEvents: [Event!] 
			}

			input UserInput {
				username: String!
				email: String!
				password: String!
			}

			input EventInput {
				title: String!
				description: String!
				price: Float!
				date: String! 
			}

            type RootQuery {
                events: [Event!]!
            }

            type RootMutation {
                createEvent(eventInput: EventInput ): Event
				createUser(userInput: UserInput ): User
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `);
