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
console.log(chalk.cyan(text.REGISTRATION_PRETEST_NOTE));
console.log(chalk.cyan(text.ASTERISK_NOTE));

rl.question('> Enter a valid email: ', email => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
 	            apiname: 'source_cognito_post',
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
 	    		let ccode = res.data.body.response.ccode;
			    console.log(chalk.bgGreen.bold(text.COGNITO_POST_PASSED));
			    console.log(chalk.magenta(text.COGNITO_POST_NOTE));
			    cognitoConfirm(ccode, email);
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.COGNITO_POST_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.COGNITO_POST_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
});

const cognitoConfirm = (ccode, email) => {
	rl.question('> Enter the confirmation code: ', code => {
	 	axios.post(
	 	    devAPIURL,
	 	    {
	 	        params: {
	 	            apiname: 'source_cognito_confirm_put',
	 	            user_name: email,
	 	            confirmation_code: code,
	 	        }
	 	    },
	 	    {
	 	        headers: headers
	 	    }
	 	)
	 	.then(res => {
	 	    res.data.body.status === 200
	 	    	? (() => {
				    console.log(chalk.bgGreen.bold(text.COGNITO_CONFIRM_PASSED));
				    sourceUserPost(ccode, email);
				})()
	 	    	: (() => {
	 	    		console.log(chalk.bgRed.bold(text.COGNITO_CONFIRM_FAILED));
				    console.log(res.data);
				    process.exit(1);
				})();
	 	})
	 	.catch(err => {
	 		console.log(chalk.bgRed.bold(text.COGNITO_CONFIRM_FAILED));
	 	    console.error(err);
			process.exit(1);
	 	});
	})
}

const sourceUserPost = (ccode, email) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
 	        	apiname: 'source_user_post',
 	        	ccode: ccode,
 	        	nickname: 'user1234',
 	        	gender: 0,
 	        	birthday: '19800101',
 	        	mid: [1, 43, 112],
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
			    console.log(chalk.bgGreen.bold(text.USER_POST_PASSED));
			    masterCodeGet();
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.USER_POST_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.USER_POST_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
}

const masterCodeGet = () => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
 	        	apiname: 'master_code_get',
 	        }
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
			    console.log(chalk.bgGreen.bold(text.MASTER_CODE_GET_PASSED));
			    console.log(chalk.magenta(text.REGISTRATION_COMPLETE_NOTE));
			    process.exit();
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.MASTER_CODE_GET_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.MASTER_CODE_GET_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
}