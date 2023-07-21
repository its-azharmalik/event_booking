const express = require('express');
const morgan = require('morgan');
const bd = require('body-parser');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const { upload } = require('./config/multer');
const db = require('./config/db.config');
const errorList = require('./config/errorList');
const { cloudinary } = require('./config/cloudinary');
const router = require('./routes');
const { tokenVerification } = require('./config');

const { graphqlHTTP } = require('express-graphql');

// Schema
const { buildSchema } = require('graphql');

const Event = require('./models/Event');
const { signup } = require('./controllers/auth.controller');
const { User } = require('./models');

dotenv.config();

const PORT = 8080;

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// app.use(bd.urlencoded({ extended: false }));
app.use(bd.json());

const events = [];

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolver = require('./graphql/resolvers/index');

app.use(
	'/graphql',
	graphqlHTTP({
		schema: graphqlSchema,
		rootValue: graphqlResolver,
		graphiql: true,
	})
);

app.use('/api', router);

app.get('/home', tokenVerification, (req, res) => {
	res.json('welcome');
});

app.post(
	'/testcloudinary',
	tokenVerification,
	upload.single('url'),
	async (req, res) => {
		try {
			if (!req.file)
				res.status(500).json({
					err: errorList.file.noFilesAttached,
				});
			const image = req.file.path;
			const options = {
				use_filename: true,
				unique_filename: false,
				overwrite: true,
			};
			const result = await cloudinary.uploader.upload(image, options);
			res.json(result);
		} catch (err) {
			console.log(err.message);
		}
	}
);

app.post(
	'/testcloudinarymultiple',
	tokenVerification,
	upload.array('urls'),
	async (req, res) => {
		try {
			if (!req.files)
				res.status(500).json({
					err: errorList.file.noFilesAttached,
				});
			const images = req.files.map((file) => file.path);
			const options = {
				use_filename: true,
				unique_filename: false,
				overwrite: true,
			};
			let result = [];
			for (const image of images) {
				const imgUrl = await cloudinary.uploader.upload(image, options);
				result.push(imgUrl);
			}
			await Promise.all(result);
			res.send(result);
		} catch (err) {
			console.log(err.message);
		}
	}
);

app.listen(PORT, () => {
	console.log(`App running on PORT ${`${PORT}`.bold.yellow}`);
});
