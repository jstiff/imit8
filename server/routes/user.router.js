import express from 'express';
import { rejectUnauthenticated } from '../modules/authentication.middleware.js';
import pool from '../modules/pool.js';
import moment from 'moment';
const router = express.Router();

// *************passport implementation of oAuth*************************

router.put('/history/:id', rejectUnauthenticated, (req, res) => {
	console.log('SERVER PUT ', req.body.data);
	const queryString = `UPDATE "metrics" SET "comments" = $1  WHERE id=$2;`;
	pool
		.query(queryString, [req.body.data, req.params.id])
		.then((response) => {
			res.sendStatus(200);
		})
		.catch((err) => {
			console.log('error in DELETE', err);
		});
});

router.delete('/history/:id', rejectUnauthenticated, (req, res) => {
	console.log('SERVER poop', req.params);
	const queryString = `DELETE FROM "metrics" WHERE id=$1;`;
	pool
		.query(queryString, [req.params.id])
		.then((response) => {
			res.sendStatus(200);
		})
		.catch((err) => {
			console.log('error in DELETE', err);
		});
});

router.get('/history', rejectUnauthenticated, (req, res) => {
	console.log('inside HISTORY route', req.user);
	const queryString = `
  SELECT  "metrics"."id" AS "metrics_id", "avatar_url", "name", "repo_name", "file_name","time_stamp", "percent_correct", "comments"  FROM "metrics"
  JOIN "chosen_file" ON "metrics"."file_id" = "chosen_file"."id"
  JOIN "repos" ON "chosen_file"."repo_id" = "repos"."id"
  JOIN "fav_coders" ON "repos"."repo_owner" = "fav_coders"."id"
  JOIN "user_favCoder" ON "user_favCoder"."fav_coder_id" = "fav_coders"."id"
  JOIN "user" ON "user_favCoder"."user_id" = "user"."id"
  WHERE "user"."id" = ${req.user.id}
  ;`;
	pool
		.query(queryString)
		.then((result) => {
			console.log('History repsonse', result.rows);
			res.send({
				loaded: true,
				data: result.rows
			});
		})
		.catch(() => {
			res.sendStatus(500);
			console.log('eRror LLL HISTORY');
		});
});

// Handles Ajax request for user information if user is authenticated

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
	const first_name = req.body.first_name;
	const email = req.body.email;
	const username = req.body.username;
	const password = encryptLib.encryptPassword(req.body.password);

	const queryText =
		'INSERT INTO "user" (first_name, email, username, password) VALUES ($1, $2, $3,$4) RETURNING id';
	pool
		.query(queryText, [first_name, email, username, password])
		.then(() => res.sendStatus(201))
		.catch(() => res.sendStatus(500));
});

router.post('/results', rejectUnauthenticated, async (req, res, next) => {
	console.log('RESPONSE SERVER', req.body);
	const time = moment().format('LLLL');
	const fav_coder = req.body[0];
	const lessonUserId = req.user.id;
	const repos = req.body[1];
	const chosen_file = req.body[2];
	const percent_correct = req.body[3];
	// inconst user_id = req.user.id;
	console.log('%%%%', req.user);
	const connection = await pool.connect();

	try {
		// for(let i in req.body){ console.log("POOP", i)};
		//console.log("results *****", );
		const fav_coder_query = `INSERT INTO fav_coders (name, user_name, avatar_url) VALUES ($1, $2, $3) RETURNING id;`;

		const joinTableQuery = `INSERT INTO  "user_favCoder" (user_id, fav_coder_id) VALUES ($1,$2);`;

		const repo_query = `INSERT INTO repos (repo_name, repo_url, repo_owner) VALUES ($1, $2, $3) RETURNING id;`;

		const chosen_file_query = `INSERT INTO chosen_file (file_name, file_url, repo_id) VALUES ($1, $2, $3) RETURNING id;`;

		const score_query = `INSERT INTO metrics (percent_correct, time_stamp, file_id) VALUES ($1, $2, $3);`;

		const fav_coderInstance = await connection.query(fav_coder_query, [
			fav_coder.name,
			fav_coder.userName,
			fav_coder.avatar_url
		]);
		const fav_coderId = fav_coderInstance.rows[0].id;
		await connection.query(joinTableQuery, [lessonUserId, fav_coderId]);
		console.log('Fav_coder', fav_coderId, fav_coderInstance.rows[0].id);
		const repoInstance = await connection.query(repo_query, [
			repos.repo_name,
			repos.repo_url,
			fav_coderId
		]);
		const repoId = repoInstance.rows[0].id;
		console.log('REEEPPPPOOOO', repoId);

		const chosen_fileInstance = await connection.query(chosen_file_query, [
			chosen_file.file_name,
			chosen_file.file_url,
			repoId
		]);

		const fileId = chosen_fileInstance.rows[0].id;
		await connection.query(score_query, [percent_correct.percent_correct, time, fileId]);

		await connection.query('COMMIT;');
		res.sendStatus(200);
	} catch (error) {
		console.log('REsults route Failed', error);
		await connection.query('ROLLBACK');
		res.sendStatus(500);
	} finally {
		connection.release();
	}
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
	// Use passport's built-in method to log out the user
	console.log('LogOUT REACHED');
	req.logout();
	res.sendStatus(200);
});

export default router;
