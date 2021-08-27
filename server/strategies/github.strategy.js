import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
//const Strategy = GitHubStrategy.Strategy();
import pool from '../modules/pool.js';
import config from '../config.js';
const { client_id, client_secret } = config;

passport.serializeUser((user, done) => {
	console.log('4 INSIDE SERIALIZE', user.gitHubId);
	done(null, user.profile.id);
});

// this fires on every request from the Browswer...need to authenticate 'uid' in database...seems really
// inefficient. Will look into some sort of cache. Prob just want to check for 'does exist'.
passport.deserializeUser((id, done) => {
	console.log('DESEIRLADD', id);
	pool
		.query(`SELECT * FROM "session_user" WHERE "gitHubId" = $1;`, [id])
		.then((result) => {
			// Handle Errors
			const user = result && result.rows && result.rows[0];

			if (user) {
				console.log('USER FOUND IN SERVER');
				done(null, user);
			} else {
				// user not found
				// done takes an error (null in this case) and a user (also null in this case)
				// this will result in the server returning a 401 status code
				done(null, null);
			}
		})
		.catch((error) => {
			done(error, null);
		});
});

passport.use(
	new GitHubStrategy(
		{
			clientID: client_id,
			clientSecret: client_secret,
			callbackURL: 'http://localhost:5000/authenticate/auth/github/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			const { id } = profile;
			const getUser = `SELECT * FROM "session_user" WHERE "session_user"."gitHubId" = $1;`;
			pool.query(getUser, [id]).then((result) => {
				const user = result && result.rows && result.rows[0];

				if (user) {
					let data = result.rows[0];
					done(null, data);
				} else {
					const create_user = `INSERT INTO "session_user" ("gitHubId", "profile")
         VALUES ($1,$2) RETURNING *;`;
					pool.query(create_user, [id, profile]).then((result) => {
						done(null, result.rows[0]);
					});
				}
			});
		}
	)
);

export default passport;
