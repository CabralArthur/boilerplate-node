import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import express from 'express';

import * as Logger from './utils/logger';

export const setup = app => {
	app.use(cors());
	app.use(helmet());
	app.use(express.json({ limit: '100000kb' }));
	app.use(express.urlencoded({ extended: false, limit: '100000kb' }));

	app.use((error, req, res, next) => {
		if (error) {
			res.status(500).json({
				status: 'error',
				message: 'Algo de errado aconteceu'
			});
			return;
		}

		next();
	});
};

export const start = () => {
	dotenv.config({ path: `${__dirname}/../.env` });

	const app = express();
	const port = process.env.PORT || 3000;
	const httpServer = http.createServer(app);

	httpServer.listen(port, () => {
		Logger.success(`Server running port ${port}`);
		setup(app);
	});
};
