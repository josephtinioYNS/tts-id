import axios from 'axios';
import chalk from 'chalk';
import readline from 'readline';
import { config } from 'dotenv';
import { passed, failed } from './common.js';
import { text, headers } from './constants.js';
config();

const devAPIURL = process.env.DEV_API_URL;
const rl = readline.createInterface({
 	input: process.stdin,
 	output: process.stdout
});

console.log(chalk.cyan(text.ASTERISK_NOTE));
console.log(chalk.cyan(text.SETTING_PRETEST_NOTE_1));
console.log(chalk.cyan(text.SETTING_PRETEST_NOTE_2));
console.log(chalk.cyan(text.SETTING_PRETEST_NOTE_3));
console.log(chalk.cyan(text.ASTERISK_NOTE));

rl.question('> Enter email registered using this program: ', email => {
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
			    passed(text.LOGIN_POST_PASSED);
			    sourceUserPut(accessToken, email);
			})()
 	    	: (() => {
 	    		failed(text.LOGIN_POST_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.LOGIN_POST_FAILED, err);
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
			    passed(text.USER_PUT_PASSED);
			    sourceCognitoPut(accessToken, email);
			})()
 	    	: (() => {
 	    		failed(text.USER_PUT_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.USER_PUT_FAILED, err);
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
			    passed(text.COGNITO_PUT_PASSED);
			    sourceCognitoMfaPost(accessToken)
			})()
 	    	: (() => {
 	    		failed(text.COGNITO_PUT_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.COGNITO_PUT_FAILED, err);
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
			    passed(text.COGNITO_MFA_POST_PASSED, text.SETTING_COMPLETE_NOTE);
			    process.exit();
			})()
 	    	: (() => {
 	    		failed(text.COGNITO_MFA_POST_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.COGNITO_MFA_POST_FAILED, err);
 	});
}
