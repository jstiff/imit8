const Joi = require('joi');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const config = {
	client_id: process.env.GITHUB_CLIENT_ID,
	home_redirect_url: process.env.IMITATE_REDIRECT_URL,
	client_secret: process.env.GITHUB_CLIENT_SECRET,
	proxy_url: process.env.IMITATE_PROXY_URL
};

const envVarsSchema = Joi.object({
	client_id: Joi.string().required(),
	home_redirect_url: Joi.string().required(),
	client_secret: Joi.string().required(),
	proxy_url: Joi.string().required()
});

const { error } = envVarsSchema.validate(config);
if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

module.exports = config;
