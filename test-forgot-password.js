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
			    console.log(chalk.bgGreen.bold(text.COGNITO_FORGOT_PW_PASSED));
			    console.log(chalk.magenta(text.COGNITO_FORGOT_PW_NOTE));
			    forgotPwPost(email);
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.COGNITO_FORGOT_PW_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.COGNITO_FORGOT_PW_FAILED));
 	    console.error(err);
 	    process.exit(1);
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
				    console.log(chalk.bgGreen.bold(text.COGNITO_CONFIRM_FORGOT_PW_PASSED));
			    	console.log(chalk.magenta(text.FORGOT_PW_COMPLETE_NOTE));
				    process.exit();
				})()
	 	    	: (() => {
	 	    		console.log(chalk.bgRed.bold(text.COGNITO_CONFIRM_FORGOT_PW_FAILED));
				    console.log(res.data);
				    process.exit(1);
				})();
	 	})
	 	.catch(err => {
	 		console.log(chalk.bgRed.bold(text.COGNITO_CONFIRM_FORGOT_PW_FAILED));
	 	    console.error(err);
	 	    process.exit(1);
	 	});
	});
}
