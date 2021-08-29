// require('dotenv').config();
const express = require('express');
const cors = require('cors');
//const bodyParser = require("body-parser");
const passport = require('passport');
const app = express();

//const cookieParser = require('cookie-parser');
const sessionMiddleware = require('./modules/session-middleware');

app.use(express.json());
app.use(express.json({ type: 'text/*' }));
app.use(express.urlencoded({ extended: true }));

//Route includes
const userRouter = require('./routes/user.router');
const gitHubApiRouter = require('./routes/gitHubApi.router');
const oAuthRouter = require('./routes/oAuth.router');

//Passport Session Configuration //
//app.use(cookieParser());
app.use(sessionMiddleware);
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
app.get('/test', (req, res) => {
	console.log('REACHED');
	res.send({ title: 'GeeksforGeeks' });
});
app.use('/authenticate', oAuthRouter);
app.use('/api/user/', userRouter);
app.use('/api/gitHub/', gitHubApiRouter);

//Serve static files
//app.use(express.static("public"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
