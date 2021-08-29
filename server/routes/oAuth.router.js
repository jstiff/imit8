const express = require('express');
const router = express.Router();
const gitHub_Strategy = require('../strategies/github.strategy');
//const cors = require('cors');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { home_redirect_url } = require('../config');
// const corsOptions1 = {
// 	credentials: true,
// 	origin: 'http://localhost:5000/authenticate/auth/github'
// };

// try to use middleware like rejectUnauthentiated
router.get('/check', rejectUnauthenticated, (req, res) => {
	console.log('NEW ROUTE');
	res.status(200).json({
		authenticated: true,
		message: 'user successfully authenticated',
		user: req.user,
		cookies: req.cookies
	});
});
router.get('/login/success', (req, res) => {
	console.log('COME on Man!', req.cookies);
});

// const authCheck = (req, res, next) => {
//   if (!req.cookies) {
//     console.log("AUTH CHECK", req.cookies);
//     res.send.json({ authenticated: false });
//   } else {
//     next();
//   }
// };

// router.get("/login/success", authCheck, (req, res) => {
//   console.log("*********/cookies************", req.cookies);
//   if (req.user) {
//     res.json({
//       success: true,
//       message: "user has successfully authenticated",
//       user: req.user,
//       cookies: req.cookies,
//     });
//   }
// });

router.get('/login/failed', (req, res) => {
	res.status(401).json({
		success: false,
		message: 'user failed to authenticate.'
	});
});

router.get(
	'/login',

	gitHub_Strategy.authenticate('github', { scope: ['profile'] })
);

// passport will pass in a logged in user data through req.user
router.get(
	'/auth/github/callback',

	gitHub_Strategy.authenticate('github', {
		failureRedirect: '/login/failed'
	}),
	function (req, res) {
		res.send({ user: req.user });
	}
);

module.exports = router;

// router.get("/userState", (req, res) => {
// 	console.log("inside userSTate route");
// 	const initialState = {
// 	  client_id,
// 	  home_redirect_url,
// 	  proxy_url,
// 	  loaded,
// res.send(initialState);
// });
// 	};
