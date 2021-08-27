import express from 'express';
const router = express.Router();
import Axios from 'axios';
import { rejectUnauthenticated } from '../modules/authentication.middleware.js';

router.post('/content', rejectUnauthenticated, (req, res) => {
	const content_url = `${req.body.url}?client_id=${process.env.GITHUB_ClIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`;

	Axios.get(content_url)
		.then((response) => {
			const buffer = new Buffer.from(response.data.content, 'base64');
			const lessonText = buffer.toString('ascii');
			const lessonArray = lessonText.split('');
			console.log('ASCKII', lessonArray);

			res.send({
				loaded: true,
				data: lessonArray
			});
		})
		.catch((err) => {
			console.log('error in AXIOS_CONTENT', err);
		});
});

router.post('/tree', rejectUnauthenticated, (req, res) => {
	const tree = `https://api.github.com/repos/${req.body.userName}/${req.body.repoName}/git/trees/master?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`;

	Axios.get(tree)
		.then((response) => {
			res.send({
				loaded: true,
				data: response.data.tree
			});
		})
		.catch((err) => {
			console.log('GITHUB API ERROR', err);
			res.sendStatus(500);
		});
});

router.post('/treeTwo', rejectUnauthenticated, (req, res) => {
	const tree = `${req.body.url}?client_id=${process.env.GITHUB_ClIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`;

	Axios.get(tree)
		.then((response) => {
			res.send({
				loaded: true,
				data: response.data.tree
			});
		})
		.catch((err) => {
			console.log('GITHUB API ERROR', err);
			res.sendStatus(500);
		});
});

router.post('/repos', rejectUnauthenticated, (req, res) => {
	const repos = `https://api.github.com/users/${req.body.userName}/repos?per_page=5?client_id=${process.env.GITHUB_ClIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`;

	const blob = `https://api.github.com/repos/${req.body.userName}/typing.io-clone/git/blobs/7ae08b964fe2c5511247fabf033f5f8b937abde6?client_id=f00efe0a15d0dd37c99d&client_secret=d4a42f22546157493f204551cbbf9bd`;

	Axios.get(repos)
		.then((response) => {
			res.send({
				data: response.data,
				loaded: true
			});
		})
		.catch((err) => {
			console.log('GITHUB API ERROR', err);
			res.sendStatus(500);
		});
});
router.post('/', rejectUnauthenticated, (req, res) => {
	console.log('SESSION', req.session);
	const userInfo = `https://api.github.com/users/${req.body.userName}?client_id=${process.env.GITHUB_ClIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`;

	const userInfo2 = `https://api.github.com/users/${req.body.userName}/hovercard?subject_type=repository?client_id=${process.env.GITHUB_ClIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`;

	const testGetRepo = `https://api.github.com/repos/jstiff/typing.io-clone/contents/sourceCode.txt?client_id=f00efe0a15d0dd37c99d&client_secret=d4a42f22546157493f204551cbbf9bd`;

	const blob = `https://api.github.com/repos/${req.body.userName}/typing.io-clone/git/blobs/7ae08b964fe2c5511247fabf033f5f8b937abde6?client_id=f00efe0a15d0dd37c99d&client_secret=d4a42f22546157493f204551cbbf9bd`;

	Axios.get(userInfo)
		.then((response) => {
			// console.log("pooooooooop", response.data);
			res.send({
				loaded: true,
				data: response.data
			});
		})
		.catch((err) => {
			console.log('GITHUB API ERROR', err);
			res.sendStatus(500);
		});
});
export default router;
