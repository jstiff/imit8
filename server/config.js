//const Joi = require('joi');
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config = {
	client_id: process.env.GITHUB_CLIENT_ID,
	home_redirect_url: process.env.PASSPORT_REDIRECT_TO_CLIENT,
	client_secret: process.env.GITHUB_CLIENT_SECRET,
	proxy_url: process.env.IMITATE_PROXY_URL,
	gitHub_oAuth_callback: process.env.OAUTH_CALLBACK_URL
};

//

// const { error } = envVarsSchema.validate(config);
// if (error) {
// 	throw new Error(`Config validation error: ${error.message}`);
// }

export default config;
