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

console.log(chalk.cyan(text.ASTERISK_NOTE));
console.log(chalk.cyan(text.CHANGE_MAIL_PRETEST_NOTE));
console.log(chalk.yellow(text.WARNING_NOTE));
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
			    console.log(chalk.bgGreen.bold(text.LOGIN_POST_PASSED));
			    sourceCognitoPut(accessToken);
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

const sourceCognitoPut = (accessToken) => {
	rl.question('> Enter the new email: ', newEmail => {
	 	axios.post(
	 	    devAPIURL,
	 	    {
	 	        params: {
	  				apiname: 'source_cognito_put',
	  				AccessToken: accessToken,
	  				type: 'email',
	  				email: newEmail
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
				    console.log(chalk.magenta(text.COGNITO_VERIFY_USER_NOTE));
				    loginWithNewEmail(newEmail);
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
	})
}

const loginWithNewEmail = (newEmail) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_login_post',
				user_name: newEmail,
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
 	    		let newAccessToken =  res.data.body.response.AccessToken;
			    resendConfirmationCode(newAccessToken);
			})()
 	    	: (() => {
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 	    console.error(err);
 	    process.exit(1);
 	});
}

const resendConfirmationCode = (newAccessToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_cognito_resend_confirmation_code_get',
  				AccessToken: newAccessToken,
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
			    console.log(chalk.bgGreen.bold(text.COGNITO_RESEND_CODE_GET_PASSED));
			    console.log(chalk.magenta(text.COGNITO_RESEND_CODE_GET_NOTE));
			    verifyUserPut(newAccessToken);
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.COGNITO_RESEND_CODE_GET_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.COGNITO_RESEND_CODE_GET_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
}

const verifyUserPut = (newAccessToken) => {
	rl.question('> Enter the confirmation code re-sent to new email: ', code => {
	 	axios.post(
	 	    devAPIURL,
	 	    {
	 	        params: {
	  				apiname: 'source_cognito_verify_user_attribute_put',
	  				AccessToken: newAccessToken,
	  				confirmation_code: code,
	  				type: 'email'
	  			}
	 	    },
	 	    {
	 	        headers: headers
	 	    }
	 	)
	 	.then(res => {
	 	    res.data.body.status === 200
	 	    	? (() => {
				    console.log(chalk.bgGreen.bold(text.COGNITO_VERIFY_USER_PUT_PASSED));
			    	console.log(chalk.magenta(text.CHANGE_MAIL_COMPLETE_NOTE));
				    process.exit();
				})()
	 	    	: (() => {
	 	    		console.log(chalk.bgRed.bold(text.COGNITO_VERIFY_USER_PUT_FAILED));
				    console.log(res.data);
				    process.exit(1);
				})();
	 	})
	 	.catch(err => {
	 		console.log(chalk.bgRed.bold(text.COGNITO_VERIFY_USER_PUT_FAILED));
	 	    console.error(err);
	 	    process.exit(1);
	 	});
	});
}
