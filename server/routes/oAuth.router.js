import express from 'express';
const router = express.Router();
import gitHub_Strategy from '../strategies/github.strategy.js';

import { rejectUnauthenticated } from '../modules/authentication.middleware.js';
import config from '../config.js';

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
		successRedirect: config.home_redirect_url,
		failureRedirect: '/login/failed'
	})
);

export default router;

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
