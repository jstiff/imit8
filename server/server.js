import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
//const bodyParser from"body-parser";
import passport from 'passport';
const app = express();

app.use(express.json());
app.use(express.json({ type: 'text/*' }));
app.use(express.urlencoded({ extended: true }));

//Route includes
import userRouter from './routes/user.router.js';
import gitHubRouter from './routes/gitHubApi.router.js';
import oAuthRouter from './routes/oAuth.router.js';
import { cookie } from './modules/session-middleware.js';

//Passport Session Configuration //

app.use(cookie);
app.use(passport.initialize());
app.use(passport.session());
// app.use((req, res, next) => {
//   console.log("APP.USE REQUEST");
//   next();
// });
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:3000',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
	})
);

app.use('/authenticate', oAuthRouter);
app.use('/api/user/', userRouter);
app.use('/api/gitHub/', gitHubRouter);

//Serve static files
//app.use(express.static("public"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
