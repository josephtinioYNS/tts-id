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
console.log(chalk.cyan(text.FORGOT_PW_PRETEST_NOTE));
console.log(chalk.cyan(text.ASTERISK_NOTE));

rl.question('> Enter email registered using this program: ', email => {
 	axios.post(
 	    devAPIURL,
 	    {
 	       params: {
       			apiname: 'source_cognito_forgot_password_post',
       			user_name: email,
       		}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
			    passed(text.COGNITO_FORGOT_PW_PASSED, text.COGNITO_FORGOT_PW_NOTE);
			    forgotPwPost(email);
			})()
 	    	: (() => {
			    failed(text.COGNITO_FORGOT_PW_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.COGNITO_FORGOT_PW_FAILED, err);
 	});
});

const forgotPwPost = (email) => {
	rl.question('> Enter the confirmation code: ', code => {
	 	axios.post(
	 	    devAPIURL,
	 	    {
	 	        params: {
	    			apiname: 'source_cognito_confirm_forgot_password_put',
	    			user_name: email,
	    			password: 'abcABC123',
	    			confirmation_code: code
	    		}
	 	    },
	 	    {
	 	        headers: headers
	 	    }
	 	)
	 	.then(res => {
	 	    res.data.body.status === 200
	 	    	? (() => {
			    	passed(text.COGNITO_CONFIRM_FORGOT_PW_PASSED, text.FORGOT_PW_COMPLETE_NOTE);
				    process.exit();
				})()
	 	    	: (() => {
				    failed(text.COGNITO_CONFIRM_FORGOT_PW_FAILED, res.data);
				})();
	 	})
	 	.catch(err => {
	 		failed(text.COGNITO_CONFIRM_FORGOT_PW_FAILED, err);
	 	});
	});
}
