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

console.log(chalk.cyan(text.SETTING_PRETEST_NOTE_1));
console.log(chalk.cyan(text.SETTING_PRETEST_NOTE_2));
console.log(chalk.cyan(text.SETTING_PRETEST_NOTE_3));

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
			    console.log(chalk.bgGreen.bold(text.LOGIN_POST_PASSED));
			    sourceUserPut(accessToken, email);
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

const sourceUserPut = (accessToken, email) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_user_put',
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
			    console.log(chalk.bgGreen.bold(text.USER_PUT_PASSED));
			    sourceCognitoPut(accessToken, email);
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.USER_PUT_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.USER_PUT_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
}

const sourceCognitoPut = (accessToken, email) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_cognito_put',
  				AccessToken: accessToken,
  				type: 'email',
  				email: email
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
			    console.log(chalk.bgGreen.bold(text.COGNITO_PUT_PASSED));
			    sourceCognitoMfaPost(accessToken)
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.COGNITO_PUT_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.COGNITO_PUT_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
}

const sourceCognitoMfaPost = (accessToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_cognito_mfa_post',
  				type: 'mfa_off',
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
			    console.log(chalk.bgGreen.bold(text.COGNITO_MFA_POST_PASSED));
			    process.exit();
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.COGNITO_MFA_POST_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.COGNITO_MFA_POST_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
}
