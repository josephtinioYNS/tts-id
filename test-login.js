import axios from 'axios';
import chalk from 'chalk';
import readline from 'readline';
import { config } from 'dotenv';
import { text, headers } from './constants.js';
config();

const devAPIURL = process.env.DEV_API_URL;
const rl = readline.createInterface({
 	input: process.stdin,
 	output: process.stdout
});

console.log(chalk.cyan(text.LOGIN_PRETEST_NOTE));

rl.question('Enter email registered using this program: ', email => {
 	axios.post(
 	    devAPIURL,
 	    {
			params: {
				apiname: 'source_login_post',
				user_name: email,
				password: 'abcABC123',
			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
 	    		let accessToken =  res.data.body.response.AccessToken;
 	    		let refreshToken =  res.data.body.response.RefreshToken;
			    console.log(chalk.bgGreen.bold(text.LOGIN_POST_PASSED));
			    sourceUserGet(accessToken, refreshToken);
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.LOGIN_POST_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.LOGIN_POST_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
});

const sourceUserGet = (accessToken, refreshToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_user_get',
  				AccessToken: accessToken,
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
			    console.log(chalk.bgGreen.bold(text.USER_GET_PASSED));
			    sourceCognitoGet(accessToken, refreshToken)
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.USER_GET_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.USER_GET_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
}

const sourceCognitoGet = (accessToken, refreshToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_cognito_get',
  				AccessToken: accessToken,
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
			    console.log(chalk.bgGreen.bold(text.COGNITO_GET_PASSED));
			    sourceCognitoTokenGet(refreshToken)
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.COGNITO_GET_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.COGNITO_GET_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
}

const sourceCognitoTokenGet = (refreshToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_cognito_token_get',
  				RefreshToken: refreshToken,	
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
			    console.log(chalk.bgGreen.bold(text.COGNITO_TOKEN_GET_PASSED));
			    process.exit();
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.COGNITO_TOKEN_GET_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.COGNITO_TOKEN_GET_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
}
