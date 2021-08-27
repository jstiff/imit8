const rejectUnauthenticated = (req, res, next) => {
	// check if logged in

	if (req.isAuthenticated()) {
		console.log('IN REJECTONAUTHENTICATE....success!!!!');
		// They were authenticated! User may do the next thing
		// Note! They may not be Authorized to do all things
		next();
	} else {
		console.log('IN REJECTUNAUTHENTICATED....failure');
		// failure best handled on the server. do redirect here.
		res.sendStatus(403);
	}
};

module.exports = { rejectUnauthenticated };
