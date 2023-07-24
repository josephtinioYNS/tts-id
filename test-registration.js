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
			    passed(text.COGNITO_POST_PASSED, text.COGNITO_POST_NOTE);
			    cognitoConfirm(ccode, email);
			})()
 	    	: (() => {
			    failed(text.COGNITO_POST_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.COGNITO_POST_FAILED, err);
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
				    passed(text.COGNITO_CONFIRM_PASSED);
				    sourceUserPost(ccode, email);
				})()
	 	    	: (() => {
				    failed(text.COGNITO_CONFIRM_FAILED, res.data);
				})();
	 	})
	 	.catch(err => {
	 		failed(text.COGNITO_CONFIRM_FAILED, err);
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
 	        	email: email,
 	        	gcode: '123456789'
 	        }
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
			    passed(text.USER_POST_PASSED);
			    masterCodeGet();
			})()
 	    	: (() => {
			    failed(text.USER_POST_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.USER_POST_FAILED, err);
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
			    passed(text.MASTER_CODE_GET_PASSED, text.REGISTRATION_COMPLETE_NOTE);
			    process.exit();
			})()
 	    	: (() => {
			    failed(text.MASTER_CODE_GET_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.MASTER_CODE_GET_FAILED, err);
 	});
}